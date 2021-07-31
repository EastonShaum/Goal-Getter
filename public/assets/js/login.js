async function signupFormHandler(event) {
    event.preventDefault();
    const first_name = $("#first-name-input").val().trim();
    const last_name = $("#last-name-input").val().trim();
    const email = $('#email-input').val().trim();
    const password = $('#password-input').val().trim();
    const username = $('#username-input').val().trim();
    console.log(username, password)
    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                first_name,
                last_name,
                email,
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            console.log("account created")
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

async function loginFormHandler(event) {
    event.preventDefault();

    const username = $('#username-input').val().trim();
    const password = $('#password-input').val().trim();
    console.log(username, password)
    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

$('#login-form').on('submit', loginFormHandler);
$('#signup-form').on('submit', signupFormHandler);