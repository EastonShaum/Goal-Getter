const milestoneId = $('.milestone-card').attr('data-milestone-id');

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

const getDropdownValue = (event) => {
    event.preventDefault();

    let status

    const listElId = $('.dropdown-item').on('click', function(status) {
        const id = $(this).attr('id');
        status = $(this).text();
        console.log('status', status);

        $('#milestone-' + milestoneId + '-status').text(`${status}`);

        if (status === 'Delete') {
            deleteMilestoneHandler();
        } else {
            editMilestoneHandler(status);
        }
    });
}

async function editMilestoneHandler(status) {

    const response = await fetch(`/api/milestones/${milestoneId}`, {
        method: 'PUT',
        body: JSON.stringify({
            status
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
        location.reload();
    } else {
        alert(response.statusText);
    }
}

async function deleteMilestoneHandler() {
    const response = await fetch(`/api/milestones/${milestoneId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}


// document.querySelector(".add-goal-form").addEventListener('', addMilestoneHandler);
$('#milestone-' + milestoneId + '-status').on('click', getDropdownValue);
// document.querySelector(".delete-goal-btn").addEventListener('', deleteMilestoneHandler);