let today = new Date()
let tomorrow = new Date()
tomorrow.setDate(today.getDate() + 1)

let dueDate

const flatpickrConfig = {
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Z",
    minDate: tomorrow,
    onClose: function (selectedDates, dateStr, instance) {
        dueDate = dateStr
        console.log(dueDate)
    }
}

const initDatePickr = (element) => {
    element.flatpickr({
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Z",
        minDate: tomorrow,
    });
}

const calendar = new flatpickr("#due-date-input", flatpickrConfig)

$(".modal").on("hidden.bs.modal", function () {
    $("#goal-title-input").val("");
    $("#due-date-input").val("");
    $("#goal-description-input").val("");
    $("#form-check-input").val("");
});

const getIsPublic = () => {
    if ($('#public-goal-checkbox').is(":checked")) {
        return is_public = true
    }
    return is_public = false
}

async function addGoalHandler(event) {
    event.preventDefault();

    const title = $('#goal-title-input').val();
    const description = $('#goal-description-input').val();

    // can use the jquery datepicker function to turn a modal into a calendar
    const due_date = $('#due-date-input').val();

    const is_public = getIsPublic()

    const user_id = $("#new-goal-form").attr("user-id");

    console.log({
        title,
        description,
        due_date,
        is_public,
        user_id
    })

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
                if (milestoneCounter > 1) {
                    for (let i = 1; i < milestoneCounter; i++) {
                        let milestoneTitle = $('#milestone-title-input-' + i).val();
                        let milestoneDue_date = $('#milestone-date-input-' + i).val();
                        let milestoneDescription = $('#milestone-description-input-' + i).val();
                        let milestoneGoal_id = data.id;

                        console.log({
                            milestoneTitle,
                            milestoneDescription,
                            milestoneDue_date,
                            milestoneGoal_id,
                        });

                        if (milestoneTitle && milestoneDescription && milestoneDue_date && milestoneGoal_id) {
                            addMilestoneHandler(milestoneTitle, milestoneDescription, milestoneDue_date, is_public, milestoneGoal_id, user_id); 
                        } else {
                            deleteGoalHandler(milestoneGoal_id);
                            break;
                        }
                        location.href=`/goal/${data.id}`;
                    }
                }
                else {
                    location.href=`/goal/${data.id}`;
                }
            })
            // $("#new-goal-modal").modal("toggle");
            // location.reload()
        } else {
            alert(response.statusText);
        }
    }
}

async function addMilestoneHandler(title, description, date, public, goal_id, user_id) {
    let milestoneResponse = await fetch('/api/milestones', {
        method: 'POST',
        body: JSON.stringify({
            title,
            description,
            date,
            public,
            goal_id,
            user_id
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

const deleteMilestoneField = (event) => {
    let milestoneNumber = event.target.id.replace( /^\D+/g, '');
    $("#milestone-" + milestoneNumber).remove();
}

$("#new-goal-form").on("submit", addGoalHandler);
$("#add-milestone-button").on("click", milestoneFormAdd);