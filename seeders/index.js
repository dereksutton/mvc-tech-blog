const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./01-user-seeds');
const postsData = require('./02-post-seeds');
const commentsData = require('./03-comment-seeds');

const seedAllData = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('\n----- DATABASE SYNCED -----\n');

        // Wait for users to be created first before creating posts
        const users = await User.bulkCreate(userData, {
            individualHooks: true,
            returning: true,
        });
        console.log('\n----- USERS SEEDED -----\n');

        for (const { id } of users) {
            const userPosts = postsData
                .filter((post) => post.user_id === id)
                .map((post) => ({ ...post, user_id: id }));

            await Post.bulkCreate(userPosts);
        }
        console.log('\n----- POSTS SEEDED -----\n');

        for (const { id } of users) {
            const userComments = commentsData
                .filter((comment) => comment.user_id === id)
                .map((comment) => ({ ...comment, user_id: id }));

            await Comment.bulkCreate(userComments);
        }
        console.log('\n----- COMMENTS SEEDED -----\n');

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedAllData();