async function addTeamHandler(event) {
    event.preventDefault();

    const name = document.querySelector('input[name="team-name"]').value.trim();
    const motto = document.querySelector('input[name="team-motto"]').value.trim();

    if (name && motto) {
        const response = await fetch('/api/teams', {
            method: 'POST',
            body: JSON.stringify({
                name,
                motto
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
async function editTeamHandler(event) {
    event.preventDefault();

    const name = document.querySelector('input[name="team-name"]').value.trim();
    const motto = document.querySelector('input[name="team-motto"]').value.trim();

    if (name && motto) {
        const response = await fetch('/api/teams', {
            method: 'PUT',
            body: JSON.stringify({
                name,
                motto
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
async function deleteTeamHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/teams/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.add-team-form').addEventListener('submit', addTeamHandler);
document.querySelector('.edit-team-form').addEventListener('submit', editTeamHandler);
document.querySelector('.delete-team-btn').addEventListener('click', deleteTeamHandler);