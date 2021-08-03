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

const getIsPublic = () => {
    if($('#public-goal-checkbox').is(":checked")){
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
                location.href=`/goal/${data.id}`
            })
            // $("#new-goal-modal").modal("toggle");
            // location.reload()
        } else {
            alert(response.statusText);
        }
    }
}

$("#new-goal-form").on("submit", addGoalHandler);