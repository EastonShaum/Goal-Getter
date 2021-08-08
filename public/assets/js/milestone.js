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
const getPublicElement = element => {
    if ($(element).is(":checked")) {
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
async function editMilestoneHandler(id, milestoneObj) {
    const response = await fetch(`/api/milestones/${id}`, {
        method: 'PUT',
        body: JSON.stringify(milestoneObj),
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
    const id = $(this).attr('milestone-id');
    console.log("dropdown", id)
    $(this).next().find('li.todo').on('click', function() {
        let newStatus = $(this).text();
        console.log("to-do", id)
        $(this).parent().prev().html(newStatus);
        editMilestoneStatusHandler(id, newStatus);
    });
    $(this).next().find('li.inprogress').on('click', function() {
        let newStatus = $(this).text();
        console.log("in-progress", id)
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
        let dueDate = $(this).parent().parent().parent().siblings(".milestoneEdit").children(".edit-milestone-form").attr("data-due-date");
        let dueDateElement = $(this).parent().parent().parent().siblings(".milestoneEdit").children(".edit-milestone-form").children(".due-date-div").children(".due-date-edit");
        initDefaultDatePickr(dueDateElement, dueDate)
        unhideMilestoneEdit($(this))
        $(this).parent().parent().parent().siblings(".milestoneEdit").children(".edit-milestone-form").on("submit", milestoneFormHandler);
    });
    $(this).next().find('li.text-danger').on('click', function() {
        deleteMilestoneHandler(id);
    });
});

$(".cancelBtn").on("click", function() {
    // hideMilestoneEdit($(this))
    location.reload();
})

function milestoneFormHandler(event) {
    event.preventDefault();
    const editMilestoneForm = $(event.target);
    let milestoneId = $(event.target).attr("data-milestone-id")
    console.log(editMilestoneForm)
    let goalId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]
    console.log(goalId)
    // let milestoneId = $('.edit-milestone-form').attr('data-milestone-id');
    // console.log(milestoneId)

    let milestoneObj = {
        title: editMilestoneForm[0][0].value.trim(),
        description: editMilestoneForm[0][3].value,
        due_date: editMilestoneForm[0][1].value,
        is_public: getPublicElement(editMilestoneForm[0][4]),
        goal_id: goalId
    }
    console.log(milestoneObj)

    editMilestoneHandler(milestoneId, milestoneObj);
}

function unhideMilestoneEdit(milestone) {
    $(milestone).parent().parent().parent().next().addClass("d-none");
    $(milestone).parent().parent().parent().siblings(".milestoneEdit").removeClass("d-none");
    $(milestone).parent().parent().addClass("d-none");
}

// function hideMilestoneEdit(milestone){
//     $(milestone).parent().parent().parent().siblings(".milestoneInfo").removeClass("d-none");
//     $(milestone).parent().parent().parent().addClass("d-none");
//     $(milestone).parent().parent().parent()
// }

// $('.edit-milestone-form').on('submit', function() {
    
// });

$('#new-milestone-form').on('submit', addMilestoneHandler);
// document.querySelector(".add-goal-form").addEventListener('', addMilestoneHandler);
// document.querySelector(".delete-goal-btn").addEventListener('', deleteMilestoneHandler);