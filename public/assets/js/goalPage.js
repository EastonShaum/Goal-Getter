

const flatpickrEditConfig = {
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Z",
    defaultDate: $("#due-date").attr("data-date"),
    minDate: tomorrow,
    onClose: function (selectedDates, dateStr, instance) {
        dueDate = dateStr
        console.log(dueDate)
    }
}

const calendarEditGoal = new flatpickr("#due-date-edit", flatpickrEditConfig)

const getEditIsPublic = () => {
    if ($('#public-goal-checkbox-edit').is(":checked")) {
        return is_public = true
    }
    return is_public = false
}

const ogValues = {
    pre_edit_title: $('#goal-title-edit').val(),
    pre_edit_description: $('#goal-description-edit').val(),
    pre_edit_due_date: $('#due-date-edit').val(),
    pre_edit_is_public: getEditIsPublic(),
    pre_edit_user_id: $("#edit-goal-form").attr("user-id"),
    pre_edit_completed: false
}

console.log(ogValues)

async function editGoalHandler(event) {
    event.preventDefault();

    const title = $('#goal-title-edit').val();
    const description = $('#goal-description-edit').val();

    // can use the jquery datepicker function to turn a modal into a calendar
    const due_date = $('#due-date-edit').val();

    // Use a radio button for this so that a boolean value can be used
    const is_public = getEditIsPublic()

    // Use a radio button for this so that a boolean value can be used
    const user_id = $("#edit-goal-form").attr("user-id");

    const completed = false

    const editGoal = {
        title,
        description,
        due_date,
        is_public,
        user_id,
        completed
    }

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (title && description && due_date && user_id) {
        const response = await fetch(`/api/goals/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title,
                description,
                due_date,
                is_public,
                user_id,
                completed
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
}

async function deleteGoalHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/goals/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

function openEditGoalModal(event) {
    event.preventDefault();
    console.log("clicked");
    if($("#public-val").attr("data-public") === "true") {
        $("#public-goal-checkbox").prop("checked", true)
    }
    $("#edit-goal-modal").modal("toggle");
    $("#goal-title-edit").focus();
}

async function createNoteHandler(noteObj){
    // event.preventDefault()
    
    const response = await fetch(`/api/notes/`, {
        method: 'POST',
        body: JSON.stringify(noteObj),
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

function getNoteObj (event) {
    event.preventDefault();

    const noteObj = {
        text: $("#note-text-input").val(),
        goal_id: $("#goal-title").attr("data-goal-id"),
        // milestone_id:
    }
    console.log(noteObj)
    createNoteHandler(noteObj)
}

$('#new-note-form').on('submit', getNoteObj);
$('#edit-goal-form').on('submit', editGoalHandler);
$("#edit-goal-btn").on('click', openEditGoalModal);
// $("#edit-goal-btn").on('shown.bs.modal', function () {
//     myInput.focus()
//   })
// document.querySelector('.delete-goal-btn').addEventListener('click', deleteGoalHandler);