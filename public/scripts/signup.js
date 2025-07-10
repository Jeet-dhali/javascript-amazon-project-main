

document.querySelector('.js-signup-button').addEventListener('click', async (e) => {
    e.preventDefault();
    const name = await document.querySelector('.nameField').value;
    const email = await document.querySelector('.emailField').value;
    const password = await document.querySelector('.passField').value;    
    const register = await fetch('https://amazon-clone-backend-71hb.onrender.com/api/users/register', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        name,
        email,
        password
        })
    });
    const response = await register.json();
    console.log(response);
    if (response.message === 'User registered successfully') {
        window.location.href = "signin.html";
    } else {
        console.log('Error')
    }
    
})
