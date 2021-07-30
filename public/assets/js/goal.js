async function addGoalHandler(event) {
    event.preventDefault();

    const goalTitle = document.querySelector('input[name="goal-form-title"]').value.trim();
    const goalDesc = document.querySelector('input[name="goal-form-desc"]').value.trim();

    // can use the jquery datepicker function to turn a modal into a calendar
    const goalDuedate = document.querySelector('input[name="goal-due_date-form"]').value.trim();

    // Use a radio button for this so that a boolean value can be used
    const isPublic = document.querySelector('.goal-public-btn').value;

    if (goalTitle && goalDesc && isPublic) {
        const response = await fetch('/api/goals', {
            method: 'POST',
            body: JSON.stringify({
                goalTitle,
                goalDesc,
                goalDuedate,
                isPublic,
                userId
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            console.log('success');
        } else {
            alert(response.statusText);
        }
    }
}

async function editGoalHandler(event) {
    event.preventDefault();

    const goalTitle = document.querySelector('input[name="goal-form-title"]').value.trim();
    const goalDesc = document.querySelector('input[name="goal-form-desc"]').value.trim();

    // can use the jquery datepicker function to turn a modal into a calendar
    const goalDuedate = document.querySelector('input[name="goal-due_date-form"]').value.trim();

    // Use a radio button for this so that a boolean value can be used
    const isPublic = document.querySelector('.goal-public-btn').value;


    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (goalTitle && goalDesc && isPublic) {
        const response = await fetch(`/api/goals/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                goalTitle,
                goalDesc,
                goalDuedate,
                isPublic
            }),
            headers: {
                'Content-Type': 'appliation/json'
            }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

async function deleteGoalHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/goals/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-goal-form').addEventListener('submit', editGoalHandler);
document.querySelector('.add-goal-form').addEventListener('submit', addGoalHandler);
document.querySelector('.delete-goal-btn').addEventListener('click', deleteGoalHandler);