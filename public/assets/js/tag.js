// File not in use at the moment

async function newTagHandler(event) {
    event.preventDefault();

    const name = document.querySelector('input[name="tag-name"]').value.trim();

    const response = await fetch('/api/tags', {
        method: 'POST',
        body: JSON.stringify({
            name
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboad')
    } else {
        alert(response.statusText);
    }
}

async function deleteTagHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/tags/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}


document.querySelector('.add-tag-form').addEventListener('submit', newTagHandler);
document.querySelector('.delete-tag-btn').addEventListener('click', deleteTagHandler);