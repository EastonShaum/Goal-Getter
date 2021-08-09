async function logout(event) {
    event.preventDefault();
    console.log("log out initiated")
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        console.log("logged out")
        document.location.replace("/");
    } else {
        alert(response.statusText);
    }
}

$('#logout').on('click', logout);