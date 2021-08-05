const milestoneId = $('.milestone-card').attr('data-milestone-id');

const getMilestoneIsPublic = () => {
    if ($('#public-milestone-checkbox').is(":checked")) {
        return is_public = true
    }
    return is_public = false
}

const flatpickrNewMilestoneConfig = {
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Z",
    minDate: tomorrow,
}

const calendarNewMilestone = new flatpickr("#milestone-due-date-input", flatpickrNewMilestoneConfig)

async function addMilestoneHandler(event) {
    event.preventDefault();

    milestoneObj = {
        title: $("#milestone-title-input").val().trim(),
        description: $("#milestone-description-input").val().trim(),
        due_date: $("#milestone-due-date-input").val().trim(),
        is_public: getMilestoneIsPublic(),
        goal_id: $("#goal-title").attr("data-goal-id"),
        user_id: $("#goal-title").attr("data-logged-in-user"),
    }

    if (milestoneObj.title && milestoneObj.description && milestoneObj.due_date && milestoneObj.goal_id && milestoneObj.user_id) {
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
        location.reload();
    } else {
        alert(response.statusText);
    }
}


$('#milestone-' + milestoneId + '-status').on('click', getDropdownValue);
$("#new-milestone-form").on("submit", addMilestoneHandler)
// document.querySelector(".delete-goal-btn").addEventListener('', deleteMilestoneHandler);