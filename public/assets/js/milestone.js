let tomorr = new Date()
tomorr.setDate(today.getDate() + 1)


let statusComplete = '';


function initDatePickr(element) {
    element.flatpickr({
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Z",
        minDate: tomorr
    });
}

const getPublic = () => {
    if ($('#public-milestone-checkbox').is(":checked")) {
        return true;
    } else {
        return false;
    }
}

initDatePickr($('#milestone-due-date-input'));

async function addMilestoneHandler(event) {

    milestoneObj = {
        title: $("#milestone-title-input").val().trim(),
        description: $("#milestone-description-input").val().trim(),
        due_date: $("#milestone-due-date-input").val().trim(),
        is_public: getPublic(),
        goal_id: $("#goal-title").attr("data-goal-id"),
    }


    console.log(milestoneObj)

    if (milestoneObj.title && milestoneObj.description && milestoneObj.due_date && milestoneObj.goal_id) {
        const response = await fetch('/api/milestones', {
            method: 'POST',
            body: JSON.stringify(milestoneObj),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            location.reload();
        } else {
            alert(response.statusText);
        }
    } else {
        alert('Please fill out all form fields before pushing submit.');
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
    // if (status === 'Complete'){
    //     window.onload = removeMilestoneOptions();
    // }
    
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
        statusComplete = $(this).text();
        $(this).parent().prev().html(statusComplete);
        editMilestoneHandler(id, statusComplete);
        sessionStorage.setItem(id, "Complete");

    });
    $(this).next().find('li.text-danger').on('click', function() {
        deleteMilestoneHandler(id);
    });
});


window.onload = removeMilestoneOptions();
function removeMilestoneOptions() {
    let id = sessionstorage
    console.log(statusComplete)
    if (statusComplete === 'Complete') {
    $('li').remove(":contains('To Do')");
    $('li').remove(":contains('In Progress')");
    $('li').remove(":contains('Edit')");
    $('li').remove(":contains('Complete')");
    console.log('1.0')
    }
}



$('#new-milestone-form').on('submit', addMilestoneHandler);
// document.querySelector(".add-goal-form").addEventListener('', addMilestoneHandler);
// document.querySelector(".delete-goal-btn").addEventListener('', deleteMilestoneHandler);
