let today = new Date()
let tomorrow =  new Date()
tomorrow.setDate(today.getDate() + 1)

let dueDate

const flatpickrConfig = {
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Z",
    minDate: tomorrow,
    onClose: function(selectedDates, dateStr, instance) {
        dueDate = dateStr
        console.log(dueDate)
    }
}

const calendar = new flatpickr("#due-date-input", flatpickrConfig)

$(".modal").on("hidden.bs.modal", function(){
    $("#goal-title-input").val("");
    $("#due-date-input").val("");
    $("#goal-description-input").val("");
    $("#form-check-input").val("");
});

async function addGoalHandler(event) {
    event.preventDefault();

    const title = $('#goal-title-input').val();
    const description = $('#due-date-input').val();

    // can use the jquery datepicker function to turn a modal into a calendar
    const due_date = dueDate

    // Use a radio button for this so that a boolean value can be used
    const is_public = $('#public-goal-checkbox').val();

    // const user_id = $("new-goal-form").attr("user-id").val();

    console.log({
        title,
        description,
        due_date,
        is_public,
        // user_id
    })

    if (title && description && is_public) {
        console.log({
            title,
            description,
            due_date,
            is_public,
            // user_id
        })
        // const response = await fetch('/api/goals', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         title,
        //         description,
        //         due_date,
        //         is_public,
        //         user_id
        //     }),
        //     headers: { 'Content-Type': 'application/json' }
        // });

        // if (response.ok) {
        //     console.log('success');
        // } else {
        //     alert(response.statusText);
        // }
    }
}

$("#new-goal-form").on("submit", addGoalHandler);