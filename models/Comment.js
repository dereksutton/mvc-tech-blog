const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config.js').sequelize;

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'comment',
        timestamps: true,
        underscored: true,
    }
);

module.exports = Comment;