async function loginFormHandler(event) {
    event.preventDefault();

    const username = $('#username-input');
    const password = $('#password-input');

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

$('#login-button').on('click', loginFormHandler);