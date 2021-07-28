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
async function getIdComment(btn) {
    event.preventDefault()
    const id = btn.id.split('btn')[1]
    return addComment(id)
}
async function addComment(id){
    console.log(id)
    const comment = document.getElementById(`userComment${id}`).value
    console.log(comment)
    const response = await fetch(`api/comment/create_comment/${id}`, {
        method: 'POST',
        body: JSON.stringify({
            comment
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
        if (response.ok) {
            document.location.replace('/index')
        } else {
            console.log('fail')
        }

}
async function renderLogin() {
    const render = await fetch('/index', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (render.ok) {
        return 
    } else {
        alert(render.statusText)
    }
}
if (document.getElementById('loginBtn'))
    document.getElementById('loginBtn').addEventListener('click', loginPage)
document.getElementById('dashboardBtn').addEventListener('click', dashboardPage)

renderLogin()