// FILE NOT IN USE ATM
// Create new notes retrieves new values and POST Fetch to API route
async function newNoteHandler(event) {
    event.preventDefault();

    const text = document.querySelector('input[name="note-text"]').value.trim();
    const milestoneId = document.querySelector('input[name="milestone-title"]').value.trim();
    const goalId = document.querySelector('input[name="goal-title"]').vlaue.trim();

    const response = await fetch('/api/notes', {
        method: 'POST',
        body: JSON.stringify({
            text,
            milestoneId,
            goalId
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

// Delete notes not in use atm
async function deleteNoteHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

// edit notes not in use atm
async function editNoteHandler(event) {
    event.preventDefault();

    const text = document.querySelector('input[name="note-text"]').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/notes/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            text
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

document.querySelector('.edit-note-form').addEventListener('submit', editNoteHandler);
document.querySelector('.delete-note-btn').addEventListener('click', deleteNoteHandler);
document.querySelector('.new-note-form').addEventListener('submit', newNoteHandler);