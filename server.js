const express = require('express');
const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const userRoutes =  require('./controllers/userRoutes');
const postRoutes = require('./controllers/postRoutes');
const commentRoutes = require('./controllers/commentRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up sessions with cookies
const sesh = {
    secret: process.env.SESH_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sesh));

// Inform Express.js which template engine to use
const hbs = exphbs.create({ defaultLayout: 'main' });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('register');
});

app.use('/', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on: http://localhost:${PORT}`)
    });
});