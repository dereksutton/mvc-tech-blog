const router = require('express').Router();
const session = require('express-session');
const { User, Post, Comment } = require('../models');
const bcrypt = require('bcrypt');
const withAuth = require('../utils/auth');

// register get route
router.get('/register', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('register');
});

// login get route
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
    console.log(req.session);
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
            user_id: req.session.user_id,
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

router.post('/register', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: await bcrypt.hash(req.body.password, 10),
        });

        req.session.logged_in = true;
        req.session.user_id = newUser.id;
        res.status(200).json(newUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.body.username } });

        if (!user) {
            res.status(400).json({ message: 'No user account found with that username' });
            return;
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password' });
            return;
        }

        req.session.logged_in = true;
        req.session.user_id = user.id;
        res.status(200).json({ user: user, message: 'You are now logged in!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(400).json({ message: 'You are not currently logged in.' });
    }
});

module.exports = router;