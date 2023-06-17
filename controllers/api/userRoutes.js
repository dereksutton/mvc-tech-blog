const router = require('express').Router();
const { User, Post } = require('../../models');

// Create a new user
router.post('/', async (req, res) => {
    try {
        const userDetails = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userDetails.id,
            req.session.logged_in = true,
            res.status(200).json(userDetails);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Authenticate login
router.post('/login', async (req, res) => {
    try {
        // Confirm username
        const userDetails = await User.findOne({ where: { username: req.body.username } });
        if (!userDetails) {
            res.status(400).json({ message: 'Incorrect username or password!' });
            return;
        }
        // Confirm password
        const confirmPassword = await userDetails.checkPassword(req.body.password);
        if (!confirmPassword) {
            res.status(400).json({ message: 'Incorrect username or password!' });
            return;
        }

        const user = userDetails.get({ plain: true });
        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.logged_in = true;
            res.json({ user: user, message: 'Login successful!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Logout
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