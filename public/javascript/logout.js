async function logOut(event) {
    event.preventDefault()

    const response = await fetch('/api/user/logout', {
      method: 'POST'
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.data.message);
    }
  }
  if(document.getElementById('logoutBtn'))
  document.getElementById('logoutBtn').addEventListener('click', logOut)