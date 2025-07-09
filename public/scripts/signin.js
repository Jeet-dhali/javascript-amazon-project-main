

document.querySelector('.js-signup-button').addEventListener('click', async (e) => {
    e.preventDefault();
    const email = await document.querySelector('.emailField').value;
    const password = await document.querySelector('.passField').value;    
    const register = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
        email,
        password
        })
    });
    const response = await register.json();
    if (response.message === 'Login successful') {

        setTimeout(() => {
            window.location.href = 'index.html';
            const signupLink = document.querySelector('.signin-link'); 
            const profileLink = document.querySelector('.profile-link');

            if (signupLink) signupLink.style.display = 'none';
            if (profileLink) profileLink.style.display = 'inline';

        }, 100);

    } else {
        console.log('Error')
    }
    
})
