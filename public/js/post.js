console.log('post.js file is loaded!');

const commentSaver = async (event) => {
    console.log('commentSaver function was called!');

    event.preventDefault();

    // get the post id
    let postId = event.target.getAttribute('data-id');
    let commentInput = document.querySelector(`#post-comment${postId}`);
    console.log('Comment button clicked');
    console.log(`Post ID: ${postId}, Comment Input: ${commentInput.value}`);

    if (postId && commentInput.value) {
        try {
            let response = await fetch(`/api/comments/`, {
                method: 'POST',
                body: JSON.stringify({
                    comment: commentInput.value,
                    post_id: postId
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData.message);
                document.location.reload();
            } else {
                alert('Failed to create comment');
            }
        } catch (error) {
            console.log(error);
        }
    }
};

const deleteComment = async (event) => {
    console.log('deleteComment function was called!');

    event.preventDefault();

    // Get the ID of the comment to delete
    const commentId = event.target.getAttribute('data-id');
    console.log('Delete button clicked');
    console.log(`Comment ID: ${commentId}`);

    if (commentId) {
        try {
            const response = await fetch(`/api/comments/${commentId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (response.ok) {
                console.log('Comment successfully deleted!');
                document.location.reload();
            } else {
                alert('Failed to delete comment');
            }
        } catch (error) {
            console.log(error);
        }
    }
};

document.querySelector('.comment-add').addEventListener('submit', commentSaver);

const deleteButtons = document.querySelectorAll('.delete-comment-btn');
deleteButtons.forEach(button => button.addEventListener('click', deleteComment));