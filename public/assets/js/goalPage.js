async function addGoalHandler(event) {
    event.preventDefault();

    const title = $('#goal-title-input').val;
    const description = $('#due-date-input').val;

    // can use the jquery datepicker function to turn a modal into a calendar
    const due_date = $('input[name="goal-due_date-form"]').val;

    // Use a radio button for this so that a boolean value can be used
    const is_public = $('public-goal').val;

    const user_id = $("new-goal-form").attr("user-id").val;

    if (title && description && isPublic) {
        console.log({
                title,
                description,
                due_date,
                is_public,
                user_id
            })
            // const response = await fetch('/api/goals', {
            //     method: 'POST',
            //     body: JSON.stringify({
            //         title,
            //         description,
            //         due_date,
            //         is_public,
            //         user_id
            //     }),
            //     headers: { 'Content-Type': 'application/json' }
            // });

        // if (response.ok) {
        //     console.log('success');
        // } else {
        //     alert(response.statusText);
        // }
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

    // Use a radio button for this so that a boolean value can be used
    const isCompleted = document.querySelector('.goal-completed-btn').value;



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
                isPublic,
                isCompleted
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

function openEditGoalModal(event) {
    event.preventDefault();
    console.log("clicked")
}

$('#edit-goal-form').on('submit', editGoalHandler);
$("#edit-goal-btn").on('click', openEditGoalModal)
// $("#edit-goal-btn").on('shown.bs.modal', function () {
//     myInput.focus()
//   })
// document.querySelector('.delete-goal-btn').addEventListener('click', deleteGoalHandler);