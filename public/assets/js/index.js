const newPostButton = document.querySelector('#new-post-button');
const editButton = document.querySelectorAll('.edit-button');
const deleteButton = document.querySelectorAll('.delete-button');

// Function to handle new post creation
newPostButton.addEventListener('click', (event) => {
    // Redirect to the new post page
    location.href = '/post/new';
});

// Function to handle post editing
editButton.forEach(button => {
    button.addEventListener('click', (event) => {
        // Redirect to the edit post page
        const postId = event.target.getAttribute('data-id');
        location.href = '/post/edit/${postId}';
    });
});

// Function to handle post deletion
deleteButton.forEach(button => {
    button.addEventListener('click', async (event) => {
        // Send a DELETE request to the server
        const postId = event.target.getAttribute('data-id');
        try {
            const response = await fetch('/api/posts/${postId}', { method: 'DELETE' });

            if (response.ok) {
                console.log('Post deleted');
                // Refresh the page to update the list of posts
                location.reload();
            } else {
                console.error('Error: ${response.statusText}');
            }
        } catch (error) {
            console.error('Error', error);
        }
    });
});