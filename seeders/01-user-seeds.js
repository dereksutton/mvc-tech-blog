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

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await User.bulkCreate(userData, {individualHooks: true});
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    }
};