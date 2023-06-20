const loginHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-input').value.trim();
    const password = document.querySelector('#password-input').value.trim();

    if (username && password) {
        const res = await fetch ('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            document.location.replace('/');
        } else {
            console.log('Login error encountered');
        }
    }
};

document.querySelector('.login-btn').addEventListener('click', loginHandler);