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

async function editMilestoneHandler(id, status) {
    const response = await fetch(`/api/milestones/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            status
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        location.reload();
    } else {
        alert(response.statusText);
    }
}

async function deleteMilestoneHandler(id) {
    const response = await fetch(`/api/milestones/${id}`, {
        method: 'DELETE'
    });
    
    if (response.ok) {
        location.reload();
    } else {
        alert(response.statusText);
    }
}

$('.dropdown-toggle').on('click', function() {
    let id = $(this).attr('milestone-id');
    $(this).next().find('li.todo').on('click', function() {
        let newStatus = $(this).text();
        $(this).parent().prev().html(newStatus);
        editMilestoneHandler(id, newStatus);
    });
    $(this).next().find('li.inprogress').on('click', function() {
        let newStatus = $(this).text();
        $(this).parent().prev().html(newStatus);
        editMilestoneHandler(id, newStatus);
    });
    $(this).next().find('li.complete').on('click', function() {
        let newStatus = $(this).text();
        $(this).parent().prev().html(newStatus);
        editMilestoneHandler(id, newStatus);
    });
    $(this).next().find('li.text-danger').on('click', function() {
        deleteMilestoneHandler(id);
    });
});
// document.querySelector(".add-goal-form").addEventListener('', addMilestoneHandler);
// document.querySelector(".delete-goal-btn").addEventListener('', deleteMilestoneHandler);