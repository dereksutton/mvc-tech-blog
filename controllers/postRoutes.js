const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                { 
                  model: User,
                  attributes: ['username'], 
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a post by id
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    include: [ User ],
                },
            ],
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with that id!' });
            return;
        }

        const post = postData.get({ plain: true });

        res.render('post', {
            post,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update a post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postUpdate = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(postUpdate);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete a post
router.delete('/api/posts/:id', withAuth, async (req, res) => {
    try {
        const postDelete = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (postDelete) {
            res.status(200).json(postDelete);
        } else {
            res.status(404).json({ message: 'No post found with that id!' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Render form to create new post
router.get('/new', withAuth, (req, res) => {
    res.render('newPost', { loggedIn: req.session.logged_in });
});

// Render form to edit post by id
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        if (postData) {
            const post = postData.get({ plain: true });
            res.render('editPost', { post, loggedIn: req.session.logged_in });
        } else {
            res.status(404).json({ message: 'No post found with that id!' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;