async function newPost(event){
    event.preventDefault()

    const title = document.getElementById('form-title').value
    const post = document.getElementById('form-comment').value

    if(title && post){
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
        if(response.ok){
            document.location.replace('/dashboard')
        } else {
           console.log('fail')
        }
    }
}

document.getElementById('submit-btn').addEventListener('click', newPost)