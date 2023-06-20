const registrationHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-register').value.trim();
    const password = document.querySelector('#password-register').value.trim();

    if (username && password) {
        const res = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            document.location.replace('/dashboard');
        } else {
            console.log('Registration error encountered.');
        }
    }
};

document.querySelector('.register-btn').addEventListener('click', registrationHandler);