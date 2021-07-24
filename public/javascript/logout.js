async function logOut(event) {
    event.preventDefault()

    const response = await fetch('/api/user/pikachu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
      document.location.replace('/index');
    } else {
      alert(response.statusText);
    }
  }
  
  document.getElementById('logoutBtn').addEventListener('click', logOut)