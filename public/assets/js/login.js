async function loginFormHandler(event) {
    event.preventDefault();

    const username = $('#username-input').val().trim();
    const password = $('#password-input').val().trim();

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