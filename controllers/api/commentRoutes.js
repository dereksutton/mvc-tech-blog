const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// Get all comments
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [ User, Post ]
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new comment
router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json({ message: 'Comment created successfully!' });

    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a comment
router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;