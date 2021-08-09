// Compares total milestones vs complete milestones. If equal to eachother complete goal button will be displayed. 
const checkForComplete = () => {
    const totalMilestones = $("#milestone-header").attr("data-total-milestone")
    const completeMilestones = $("#milestone-header").attr("data-complete-milestone")
    // console.log(totalMilestones, completeMilestones)
    if (totalMilestones == completeMilestones) {
        $("#goal-complete-btn").removeClass("d-none");
    }
}

// Upon clicking the complete button, fetch put to goal aopi changes the goal to complete.
const completeGoalHandler = async () => {
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/goals/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            completed_date: `${new Date()}`,
            completed: true
        }),
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
        location.replace("/achievements");
    } else {
        alert(response.statusText);
    }
}

checkForComplete()

$("#goal-complete-btn").on("click", completeGoalHandler);