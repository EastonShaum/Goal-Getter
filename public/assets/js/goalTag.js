async function addGoalTagHandler(event) {
    event.preventDefault();

    const goalName = document.querySelector('input[name="goal-name-form"]').value.trim();
    const tagName = document.querySelector('input[name="tag-name-form"]').value.trim();

    if (goalName && tagName) {
        const response = await fetch('/api/goaltags', {
            method: 'POST',
            body: JSON.stringify({
                goalName,
                tagName
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

async function deleteGoalTagHandler(event) {
    eventPreventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/goaltags/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}


document.querySelector('.add-goal_tag-form').addEventListener('submit', addGoalTagHandler);
document.querySelector('.delete-goal_tag-btn').addEventListener('click', deleteGoalTagHandler);