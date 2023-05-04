const Sequelize = require('sequelize');
const config = require('../config/config.js');
const env = process.env.NODE_ENV || 'development';

const sequelize = config[env].use_env_variable
    ? new Sequelize(process.env[config[env].use_env_variable], config[env])
    : new Sequelize(config[env].database, config[env].username, config[env].password, config[env]);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./User.js')(sequelize, Sequelize);
db.Post = require('./Post.js')(sequelize, Sequelize);
db.Comment = require('./Comment.js')(sequelize, Sequelize);

// Set up model relationships
db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

db.User.hasMany(db.Comment);
db.Comment.belongsTo(db.User);

db.Post.hasMany(db.Comment);
db.Comment.belongsTo(db.Post);

module.exports = db;