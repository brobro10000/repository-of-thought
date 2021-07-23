async function loginPage() {
    const redirect = await fetch('/login', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (redirect.ok) {
        document.location.replace('/login')
    }
    else {
        alert(redirect.statusText)
    }
}
async function dashboardPage() {
    const redirect = await fetch('/dashboard', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (redirect.ok) {
        document.location.replace('/dashboard')
    }
    else {
        alert(redirect.statusText)
    }
}

document.getElementById('loginBtn').addEventListener('click', loginPage)
document.getElementById('dashboardBtn').addEventListener('click', dashboardPage)