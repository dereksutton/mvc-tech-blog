const router = require('express').Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

router.get('/dashboard', (req, res) => {
    try {
        res.render('dashboard');
    } catch (err) {
        res.status(500).json({ message: 'Error loading Dashboard', error: err });
    }
});

router.get('/register', (req, res) => {
    try {
        res.render('register');
    } catch (err) {
        res.status(500).json({ message: 'Error loading registration page', error: err });
    }
});

router.get('/login', (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        res.status(500).json({ message: 'Error loading login page', error: err });
    }
});

router.get('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.redirect('/login');
        });
    } else {
        res.status(404).end();
    }
});

router.post('/register', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;
            res.status(200).json(newUser);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.body.username } });

        if (!user) {
            res.status(400).json({ message: 'No user with that username!' });
            return;
        }

        const validPassword = await user.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.logged_in = true;
            res.json({ user, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;