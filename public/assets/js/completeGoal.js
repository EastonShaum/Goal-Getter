const checkForComplete = () => {
    const totalMilestones = $("#milestone-header").attr("data-total-milestone")
    const completeMilestones = $("#milestone-header").attr("data-complete-milestone")
    console.log(totalMilestones, completeMilestones)
    if (totalMilestones == completeMilestones) {
        $("#goal-complete-btn").removeClass("d-none");
    }
}

const completeGoalHandler = async () => {
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/goals/${id}`, {
        method: 'PUT',
        body: JSON.stringify({completed: true}),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    if (response.ok) {
        // Create System Note for Edits made
        const noteObj = {
            text: "Goal COMPLETED!",
            goal_id: $("#goal-title").attr("data-goal-id")
        } 
        createNoteHandler(noteObj)
        location.reload();
    } else {
        alert(response.statusText);
    }
}

checkForComplete()

$("#goal-complete-btn").on("click", completeGoalHandler);