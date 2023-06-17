const router = require('express').Router();
const { Post, User, Comment } = require('../../models');


// Get all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [ User, Comment ]
        });

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get post by ID
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment, include: {
                        model: User,
                        attributes: [ 'id', 'username' ]
                    }
                },
                {
                    model: User,
                    attributes: [ 'id', 'username' ]
                }
            ]
        });

        if (!postData) {
            res.status(500).json({ message: 'No post found with that ID.' });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        console.log('Error encountered.');
        res.status(400).json(err);
    }
});

// Create post
router.post('/', async (req, res) => {
    try {
        const postData = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update post by ID
router.put('/:id', async (req, res) => {
    try {
        const { id, title, content } = req.body;
        const post = await Post.findByPk(req.params.id);
        const postData = await post.update(
            {
                id: id,
                title: title,
                content: content
            });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete post
router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;