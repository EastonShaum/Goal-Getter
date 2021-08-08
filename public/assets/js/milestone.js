let tomorr = new Date()
tomorr.setDate(today.getDate() + 1)

function initDatePickr(element) {
    element.flatpickr({
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Z",
        minDate: tomorr
    });
}
function initDefaultDatePickr(element, date) {
    element.flatpickr({
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Z",
        defaultDate: date,
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

async function editMilestoneStatusHandler(id, status) {
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
        editMilestoneStatusHandler(id, newStatus);
    });
    $(this).next().find('li.inprogress').on('click', function() {
        let newStatus = $(this).text();
        $(this).parent().prev().html(newStatus);
        editMilestoneStatusHandler(id, newStatus);
    });
    $(this).next().find('li.complete').on('click', function() {
        let newStatus = $(this).text();
        $(this).parent().prev().html(newStatus);
        editMilestoneStatusHandler(id, newStatus);
    });
    $(this).next().find('li.editBtn').on('click', function() {
        console.log($(this))
        let newStatus = $(this).text();
        let dueDate = $("#due-date").attr("data-date");
        unhideMilestoneEdit($(this))
        $(this).parent().parent().parent().siblings(".milestoneEdit").children(".edit-milestone-form").on("submit", milestoneFormHandler);
    });
    $(this).next().find('li.text-danger').on('click', function() {
        deleteMilestoneHandler(id);
    });
});

$(".cancelBtn").on("click", function() {
    hideMilestoneEdit($(this))
})

function milestoneFormHandler(event) {
    event.preventDefault()
    console.log(event)
}

function unhideMilestoneEdit(milestone) {
    $(milestone).parent().parent().parent().next().addClass("d-none")
    $(milestone).parent().parent().parent().siblings(".milestoneEdit").removeClass("d-none")
}

function hideMilestoneEdit(milestone){
    $(milestone).parent().parent().parent().siblings(".milestoneInfo").removeClass("d-none")
    $(milestone).parent().parent().parent().addClass("d-none")
}
$('#new-milestone-form').on('submit', addMilestoneHandler);
// document.querySelector(".add-goal-form").addEventListener('', addMilestoneHandler);
// document.querySelector(".delete-goal-btn").addEventListener('', deleteMilestoneHandler);

// editMilestoneHandler(id, newStatus);