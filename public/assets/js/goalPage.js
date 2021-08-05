// =======================================================
// HELPERS
// =======================================================
const dateFormater = date => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
}

const getEditIsPublic = () => {
    if ($('#public-goal-checkbox-edit').is(":checked")) {
        return is_public = true
    }
    return is_public = false
}

// Verify if there is a difference between Two Objects
const objDiff = (obj1, obj2) => {
    let keysArr = [];
    Object.keys(obj1).forEach(key => {
        if(obj1[key] !== obj2[key]){
            keysArr.push(key)
        }
    });
    return keysArr;
};

// Creates an object for 
const ogGoal = {
    title: $('#goal-title-edit').val(),
    description: $('#goal-description-edit').val(),
    due_date: $("#due-date").attr("data-date"),
    is_public: getEditIsPublic(),
    user_id: $("#edit-goal-form").attr("user-id"),
    completed: false
}

// Create Update Note for the changes made to the goal.
const updateNotes = (editedKeys, editGoal) => {
    if(editedKeys.length > 0) {
        let updateNote = `Goal Edited:\n`
        editedKeys.forEach(key => {
            switch (key) {
                case "title":
                    return updateNote = updateNote + `  - Goal Title was updated from "${ogGoal.title}" to "${editGoal.title}"\n`;
                case "description": 
                    return updateNote = updateNote + `  - Goal Description was updated.\n`
                case "due_date":
                    return updateNote = updateNote + `  - Goal Due Date was changed from ${dateFormater(ogGoal.due_date)} to ${dateFormater(editGoal.due_date)}\n`
                case "is_public":
                    if(editGoal.is_public === true) {
                        return updateNote = updateNote + `  - Goal is now a public goal!`
                    } else {
                        return updateNote = updateNote + `  - Goal is now a private goal.`
                    }
                case "completed":
                    if(editGoal.completed === true) {
                        return updateNote = updateNote + `  - Goal was marked as Complete!`
                    } else {
                        return updateNote = updateNote + `  - Goal was marked as In Progress.`
                    }
            }
        })
        return updateNote
    }
}

// Creates a noteObj for the CREATE NOTE FETCH when using the New Note feature
function getNoteObj (event) {
    event.preventDefault();

    const noteObj = {
        text: $("#note-text-input").val(),
        goal_id: $("#goal-title").attr("data-goal-id"),
        // milestone_id:
    }
    createNoteHandler(noteObj)
}



// =======================================================
// CALENDAR JS FUNCTIONS AND OBJECTS
// =======================================================

// Config for calendar
const flatpickrEditConfig = {
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Z",
    defaultDate: $("#due-date").attr("data-date"),
    minDate: tomorrow,
    onClose: function (selectedDates, dateStr, instance) {
        dueDate = dateStr
    }
}

// Calendar Init
const calendarEditGoal = new flatpickr("#due-date-edit", flatpickrEditConfig)

// =======================================================
// FETCH FUNCTIONS/HANDLERS
// =======================================================

// EDIT GOAL
async function editGoalHandler(event) {
    event.preventDefault();

    // Edit Goal Object
    const editGoal = {
        title: $('#goal-title-edit').val(),
        description: $('#goal-description-edit').val(),
        due_date: $('#due-date-edit').val(),
        is_public: getEditIsPublic(),
        user_id: $("#edit-goal-form").attr("user-id"),
        completed: false
    }
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    // Verifies that the goal was edited, if not throws error
    if (objDiff(ogGoal, editGoal).length > 0) {
        if (editGoal.title && editGoal.description && editGoal.due_date && editGoal.user_id) {
            const response = await fetch(`/api/goals/${id}`, {
                method: 'PUT',
                body: JSON.stringify(editGoal),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                // Create System Note for Edits made
                const editedKeys = objDiff(ogGoal, editGoal);
                const updateNote = updateNotes(editedKeys, editGoal)
                const noteObj = {
                    text: updateNote,
                    goal_id: $("#goal-title").attr("data-goal-id")
                } 
                createNoteHandler(noteObj)
                location.reload();
            } else {
                alert(response.statusText);
            }
        }
    } 
    else {
        $("#req-update").remove()
        $("#edit-modal-header").append(
            `<div class="alert alert-danger" id="req-update" role="alert">
                At least one field needs to be changed in order to update the goal.
            </div>`
        )
    }
}

// DELETE GOAL
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

// CREATE NOTE 
async function createNoteHandler(noteObj){
    const response = await fetch(`/api/notes`, {
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

// =======================================================
// MODAL CONTROLLERS
// =======================================================

function openEditGoalModal(event) {
    event.preventDefault();
    console.log("clicked");
    if($("#public-val").attr("data-public") === "true") {
        $("#public-goal-checkbox").prop("checked", true)
    }
    $("#edit-goal-modal").modal("toggle");
    $("#goal-title-edit").focus();
}

function openDeleteGoalModal(event) {
    event.preventDefault();
    console.log("clicked");
    $("#delete-goal-modal").modal("toggle");
    enableDeleteBtn()
}

function enableDeleteBtn(){
    let timeLeft = 4
    $("#delete-timer").text("5");

    const disableTimer = setInterval(function() {
        $("#delete-timer").text(timeLeft.toString());
        timeLeft--
    },1000)

    setTimeout(function (){
        clearInterval(disableTimer)
        $("#delete-timer").text("");
        $("#delete-goal-confirm").removeClass("disabled");
    },3000)

    disableTimer
}

// =======================================================
// EVENT LISTENERS
// =======================================================
$('#new-note-form').on('submit', getNoteObj);
$('#edit-goal-form').on('submit', editGoalHandler);
$("#edit-goal-btn").on('click', openEditGoalModal);
$("#delete-goal-modal-btn").on("click", openDeleteGoalModal);
$("#delete-goal-confirm").on("click", deleteGoalHandler)