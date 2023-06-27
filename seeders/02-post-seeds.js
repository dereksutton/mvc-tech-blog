const { Post } = require('../models');

const postData = [
    {
        title: "Why I Love Tech",
        content: "In this post, I will share my love for all things tech...",
        user_id: 4
    },
    {
        title: "Top 10 Tech Innovations of the Last Decade",
        content: "In this post, I will list the top 10 tech innovations in the last decade...",
        user_id: 2
    },
    {
        title: "How To Start A Tech Blog",
        content: "In this post, I will share some tips on how to start a tech blog...",
        user_id: 1
    },
    {
        title: "The Future Of Tech",
        content: "In this post, I will share my predictions for the future of tech...",
        user_id: 3
    },
    {
        title: "My Favorite Coding Resources",
        content: "In this post, I will share some of my favorite coding resources...",
        user_id: 4
    }
];

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await Post.bulkCreate(postData);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Posts', null, {});
    }
};