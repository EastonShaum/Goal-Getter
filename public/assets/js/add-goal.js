async function addGoal(event) {
    event.preventDefault();

    const goalTitle = document.querySelector('#goal-form-title').value.trim();
    const goalDesc = document.querySelector('#goal-form-desc').value.trim();
    const goalDuedate = document.querySelector('#goal-form-duedate').value.trim();
    const isPublic = document.querySelector('#goal-form-public').value.trim();

    if (goalTitle && goalDesc && isPublic) {
        const response = await fetch('/api/goals', {
            method: 'post',
            body:  JSON.stringify({
                goalTitle,
                goalDesc,
                goalDuedate,
                isPublic
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

document.querySelector('.newGoal-form').addEventListener('submit', addGoal);