const { Comment } = require('../models');

const commentsData = [
    {
        content: 'Wow, this post really made me think. Thanks for the great read!',
        user_id: 1,
        post_id: 1
    },
    {
        content: 'As an expert in the field, I can say your post is spot on. Well done!',
        user_id: 4,
        post_id: 1
    },
    {
        content: 'I disagree with your main point, but I appreciate your thoroughness in covering the topic.',
        user_id: 1,
        post_id: 4
    },
    {
        content: 'I never thought of it from this perspective. A lot to consider here!',
        user_id: 2,
        post_id: 3
    }
];

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await Comment.bulkCreate(commentsData);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Comments', null, {});
    }
};