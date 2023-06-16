const { User } = require('../models');

const userData = [
    {
        username: "danielSan",
        password: "iliketurtles678",
    },
    {
        username: "marilynMonroe",
        password: "ilovejfk1962",
    },
    {
        username: "blogFanatic",
        password: "blogalicious44",
    },
    {
        username: "codeNinja",
        password: "codingislife123",
    },
];

const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = seedUsers;