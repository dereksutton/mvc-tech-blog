const sessionLogout = async () => {
    const res = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
        document.location.replace('/');
    } else {
        alert(res.statusText);
    }
};

document.querySelector('#logout').addEventListener('click', sessionLogout);