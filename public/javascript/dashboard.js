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

async function getId(btn) {
    const id = btn.id.split('btn')[1]
    return deletePost(id);
}

async function deletePost(id) {
    const response = await fetch(`api/post/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert(response.statusText);
    }
}
document.getElementById('submit-btn').addEventListener('click', newPost)
