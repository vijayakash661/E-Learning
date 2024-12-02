document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const welcomeMessage = document.getElementById('welcomeMessage');

    // Save user details on Sign-Up
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = {
                fname: document.getElementById('fname').value,
                lname: document.getElementById('lname').value,
                email: document.getElementById('signupEmail').value,
                password: document.getElementById('signupPassword').value,
            };
            localStorage.setItem('user', JSON.stringify(user));
            alert('Sign-Up successful!');
            window.location.href = 'index.html';
        });
    }

    // Validate user details on Login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const user = JSON.parse(localStorage.getItem('user'));

            if (user && user.email === email && user.password === password) {
                localStorage.setItem('loggedInUser', user.fname);
                window.location.href = 'home.html';
            } else {
                alert('Invalid email or password');
            }
        });
    }

    // Display username on Home Page
    if (welcomeMessage) {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            welcomeMessage.textContent = `Welcome, ${loggedInUser}`;
        } else {
            window.location.href = 'index.html';
        }
    }
});
