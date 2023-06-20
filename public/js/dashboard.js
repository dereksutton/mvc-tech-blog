const postSaver = async (event) => {
    event.preventDefault();

    const postTitle = document.querySelector('#post-title').value.trim();
    const postContent = document.querySelector('#post-content').value.trim();

    if (postTitle && postContent) {
        const res = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({ title: postTitle, content: postContent }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Error encountered');
        }
    }
};

const updateHandler = async (event) => {
    event.preventDefault();

    const postId = event.target.getAttribute('data-id');

    if (postId) {
        const postTitle = document.querySelector(`#post-title${postId}`).value.trim();
        const postContent = document.querySelector(`#post-content${postId}`).value.trim();

        if (postTitle && postContent) {
            const res = await fetch(`/api/post/${postId}`, {
                method: 'PUT',
                body: JSON.stringify({ id: postId, title: postTitle, content: postContent }),
                headers: { 
                    'Content-Type': 'application/json',
                }
            });

            if (res.ok) {
                document.location.replace('/dashboard');
            } else {
                alert('Post update error.');
            }
        }
    }
};

const updateVisible = async (event) => {
    event.preventDefault();
    const postId = event.target.getAttribute('data-id');

    if (postId) {
        let formUpdate = document.querySelector(`#form-update${postId}`);
        formUpdate.classList.toggle('hidden');
    }
};

const deleteHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const postId = event.target.getAttribute('data-id');

        const res = await fetch(`/api/post/${postId}`, {
            method: 'DELETE',
        });

        if (res.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Post delete error');
        }
    }
};

for (let i = 0; i < document.querySelectorAll('#commit-btn').length; i++) {
    const deleteBtn = document.querySelectorAll('#commit-btn')[i];
    deleteBtn.addEventListener('click', updateHandler);
};

document.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('update-btn')) {
        updateVisible(event);
    }
});

$('.post-btn').on('click', postSaver);
$('.delete-btn').on('click', deleteHandler);