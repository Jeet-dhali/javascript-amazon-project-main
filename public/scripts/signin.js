

async function loginUser(email, password) {
  try {
    const response = await fetch('https://amazon-clone-backend-71hb.onrender.com/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
    
    const data = await response.json();
    console.log('Response data:', data);
    if(data.message === 'Login successful') {
        window.location.href = 'index.html';
    }
    
  } catch (error) {
    console.error('Login error:', error);
    alert('Login error: ' + error.message);
  }
}



document.querySelector('.js-signup-button').addEventListener('click', async (e) => {
    e.preventDefault();
    const email = await document.querySelector('.emailField').value;
    const password = await document.querySelector('.passField').value;    
    loginUser(email, password);
})