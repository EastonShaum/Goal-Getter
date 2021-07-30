async function addMilestoneHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="milestone-title"]').value.trim();
    const description = document.querySelector('input[name="milestone-description"]').value.trim();

    // can use the jquery datepicker function to turn a modal into a calendar
    const dueDate = document.querySelector('input[name="milestone-dueDate"]').value.trim();

    // Use a radio button for this so that a boolean value can be used
    const isPublic = document.querySelector('.milestone-isPublic').value;

    if (title && description && isPublic) {
        const response = await fetch('/api/milestones', {
            method: 'POST',
            body: JSON.stringify({
                title,
                description,
                dueDate,
                isPublic
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

async function editMilestoneHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="milestone-title"]').value.trim();
    const description = document.querySelector('input[name="milestone-description"]').value.trim();

    // can use the jquery datepicker function to turn a modal into a calendar
    const dueDate = document.querySelector('input[name="milestone-dueDate"]').value.trim();

    // Use a radio button for this so that a boolean value can be used
    const isPublic = document.querySelector('.milestone-isPublic').value;

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (title && description && isPublic) {
        const response = await fetch(`/api/milestones/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title,
                description,
                dueDate,
                isPublic
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

async function deleteMilestoneHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/milestones/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}


document.querySelector(".add-goal-form").addEventListener('', addMilestoneHandler);
document.querySelector(".edit-goal-form").addEventListener('', editMilestoneHandler);
document.querySelector(".delete-goal-btn").addEventListener('', deleteMilestoneHandler);