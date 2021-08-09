let today = new Date()
let tomorrow = new Date()
tomorrow.setDate(today.getDate() + 1)

let dueDate

// Configuration for flatPickr file
const flatpickrNewConfig = {
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Z",
    minDate: tomorrow,
    onClose: function (selectedDates, dateStr, instance) {
        dueDate = dateStr
        console.log(dueDate)
    }
}

// Create new calendar on element with id of due-date-input 
const calendarNewGoal = new flatpickr("#due-date-input", flatpickrNewConfig)

// Initialize flatPickr on passed through element
function initDatePickr(element) {
    element.flatpickr({
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Z",
        minDate: tomorrow
    });
}

// Clear modal values when hidden
$(".modal").on("hidden.bs.modal", function () {
    $("#goal-title-input").val("");
    $("#due-date-input").val("");
    $("#goal-description-input").val("");
    $("#form-check-input").val("");
});

// Logic to verify if goal is public checkbox is checked
const getIsPublic = () => {
    if ($('#public-goal-checkbox').is(":checked")) {
        return true
    }
    return false
}

// Create new goal, retrieves values and FETCH POSTS through api route
async function addGoalHandler(event) {
    event.preventDefault();

    const title = $('#goal-title-input').val();
    const description = $('#goal-description-input').val();

    // can use the jquery datepicker function to turn a modal into a calendar
    const due_date = $('#due-date-input').val();

    const is_public = getIsPublic();

    const user_id = $("#new-goal-form").attr("user-id");

    console.log({
        title,
        description,
        due_date,
        is_public,
        user_id
    })

    // Verification logic to prevent partial goals from being submitted
    if (title && description && due_date && user_id) {
        const response = await fetch('/api/goals', {
            method: 'POST',
            body: JSON.stringify({
                title,
                description,
                due_date,
                is_public,
                user_id
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            console.log('success');
            response.json().then(data => {
                console.log(data)
                // Add milestones after goal has been created
                if (milestoneCounter > 1) {
                    for (let i = 1; i < milestoneCounter; i++) {
                        let milestoneTitle = $('#milestone-title-input-' + i).val();
                        let milestoneDue_date = $('#milestone-date-input-' + i).val().toString();
                        let milestoneDescription = $('#milestone-description-input-' + i).val();
                        let milestoneGoal_id = data.id;

                        console.log({
                            milestoneTitle,
                            milestoneDescription,
                            milestoneDue_date,
                            milestoneGoal_id,
                        });

                        if (milestoneTitle && milestoneDue_date && milestoneGoal_id) {
                            addMilestoneHandler(milestoneTitle, milestoneDescription, milestoneDue_date, is_public, milestoneGoal_id); 
                        } else {
                            deleteGoalHandler(milestoneGoal_id);
                            break;
                        }
                        // Navigate to the new goal page
                        location.href=`/goal/${data.id}`;
                    }
                }
                else {
                    location.href=`/goal/${data.id}`;
                }
            })
            // $("#new-goal-modal").modal("toggle");
            //location.reload()
        } else {
            alert(response.statusText);
        }
    }
}

// FETCH for adding new milestones in the New Goal Modal
async function addMilestoneHandler(title, description, due_date, is_public, goal_id) {
    console.log(title, description, due_date, is_public, goal_id);
    let milestoneResponse = await fetch('/api/milestones', {
        method: 'POST',
        body: JSON.stringify({
            title,
            description,
            due_date,
            is_public,
            goal_id
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (milestoneResponse.ok) {
        console.log('Milestone Sent to server');
    }
}


async function deleteGoalHandler(goal_id) {
    const response = await fetch('/api/goals/' + goal_id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        console.log('Goal deleted');
    }
}

// Logic for adding multiple milestones to a new goal.
let milestoneCounter = 1;
const milestoneFormAdd = () => {
    let nameFieldContainer = $("<div class='form-floating mb-3'></div>");
    let milestoneNameInput = $("<input type='text' class='form-control' id='milestone-title-input-" + milestoneCounter + "' placeholder='Enter your milestone name here'>");
    let milestoneNameLabel = $("<label for='milestone-title-input-" + milestoneCounter + "'>Milestone Name</label>");
    nameFieldContainer.append(milestoneNameInput, milestoneNameLabel);

    let dueDateContainer = $("<div class='form-floating mb-3'></div>");
    let milestoneDateInput = $("<input type='datetime-local' class='form-control' id='milestone-date-input-" + milestoneCounter + "' placeholder='Provide an Achievement Date'>");
    let milestoneDateLabel = $("<label for='milestone-date-input-" + milestoneCounter + "'>Due Date</label>");
    dueDateContainer.append(milestoneDateInput, milestoneDateLabel);

    let descriptionContainer = $("<div class='form-floating mb-2'></div>");
    let milestoneDescriptionInput = $("<textarea class='form-control' placeholder='Provide a description for your 'id='milestone-description-input-" + milestoneCounter + "' style='height: 100px' spellcheck='true'></textarea>");
    let milestoneDescriptionLabel = $("<label for='milestone-description-input-" + milestoneCounter + "'>Milestone Description</label>");
    descriptionContainer.append(milestoneDescriptionInput, milestoneDescriptionLabel);

    let buttonContainer = $("<div class='form-floating d-grid'></div>")
    let deleteButton = $("<button type='button' class='btn btn-danger' id='delete-milestone-button-" + milestoneCounter + "'>Remove Milestone</button>");
    deleteButton.on("click", deleteMilestoneField);
    buttonContainer.append(deleteButton);

    let contentWrapper = $("<div class='border border-primary mb-3 p-2' id='milestone-" + milestoneCounter + "'></div>");
    contentWrapper.append(nameFieldContainer, dueDateContainer, descriptionContainer, buttonContainer);
    $("#submit-wrapper").before(contentWrapper);
    initDatePickr($("#milestone-date-input-" + milestoneCounter));
    milestoneCounter++;
}

// Deletes unwanted milestones from the new goal modal
const deleteMilestoneField = (event) => {
    let milestoneNumber = event.target.id.replace( /^\D+/g, '');
    $("#milestone-" + milestoneNumber).remove();
    milestoneCounter--;
}

$("#new-goal-form").on("submit", addGoalHandler);
$("#add-milestone-button").on("click", milestoneFormAdd);