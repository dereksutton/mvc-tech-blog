const router = require('express').Router();
const session = require('express-session');
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// register route
router.get('/register', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('register');
});

// login route
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({ include: User })
        const posts = postData.map((posts) => posts.get({ plain: true }));

        res.render('index', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post', async (req, res) => {
    try {
        const postData = await Post.findAll({ include: User });
        const posts = postData.map((posts) => posts.get({ plain: true }));

        res.render('post', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment, include: {
                        model: User,
                        attributes: ['id', 'username']
                    }
                },
                {
                    model: User,
                    attributes: ['id', 'username']
                }
            ]
        });
        const post = postData.get({ plain: true });
        res.render('post', {
            ...post,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log('Error encountered.');
        res.status(400).json(err);
    }
});

// route to dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userDetails = await User.findByPk(req.session.user_id, {
            attibutes: { exclude: ['password'] },
            include: [{ model: Post }],
        });

        const user = userDetails.get({ plain: true });
        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;