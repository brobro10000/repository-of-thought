async function signUp(event) {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username && password.length >= 8) {
        const response = await fetch('/api/user/create_user', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            if (response.status == 418) {
                alert("Pick a unique username")
            }
        }
    }
    else {
        alert("username and password are required")
    }
};
async function logIn(event) {
    event.preventDefault()

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        }),
        headers: {
            'Content-Type': 'application/json'
        },

    });
    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert(response.statusText)
    }

};


document.getElementById('signup-btn').addEventListener('click', signUp);
document.getElementById('submit-btn').addEventListener('click', logIn)