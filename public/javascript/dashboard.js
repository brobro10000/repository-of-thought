async function newPost(event) {
    event.preventDefault()

    const title = document.getElementById('form-title').value
    const post = document.getElementById('form-comment').value

    if (title && post) {
        const response = await fetch('api/post/create_post', {
            method: 'POST',
            body: JSON.stringify({
                title,
                post
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            console.log('fail')
        }
    }
}

async function getIdDelete(btn) {
    event.preventDefault()
    const id = btn.id.split('btn')[1]
    return deletePost(id);
}

async function getIdEdit(btn) {
    event.preventDefault()
    const id = btn.id.split('btn')[1]
    return editPost(id)
}

async function deletePost(id) {
    const response1 = await fetch(`api/comment/delete/${id}`,{
        method: 'DELETE'
    })
    if (response1.ok) {
        const response2 = await fetch(`api/post/delete/${id}`, {
            method: 'DELETE'
        });
        if (response2.ok) {
            document.location.replace('/dashboard')
        } else {
            alert(response.statusText);
        }
    }
}

async function editPost(id) {
    var title = document.getElementById(`title-Update${id}`).value
    var post = document.getElementById(`post-Update${id}`).value
    const response = await fetch(`api/post/edit/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            post
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert(response.statusText);
    }
}

document.getElementById('submit-btn').addEventListener('click', newPost)
