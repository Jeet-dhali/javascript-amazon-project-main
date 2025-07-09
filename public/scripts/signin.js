

document.querySelector('.js-signup-button').addEventListener('click', async (e) => {
    e.preventDefault();
    const email = await document.querySelector('.emailField').value;
    const password = await document.querySelector('.passField').value;    
    const register = await fetch('http://localhost:5500/api/users/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        email,
        password
        })
    });
    const response = await register.json();
    if (response.message === 'Login successful') {
        window.location.href = "index.html";
    } else {
        console.log('Error')
    }
    
})
