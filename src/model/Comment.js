const Sequelize = require('sequelize');
var sequelize = require('./Database');
var User = require('./User');
var Post = require('./Post');


var tableName = 'comment';
var Comment = sequelize.define(tableName, {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  body: Sequelize.STRING,
  postId: {
    type: Sequelize.INTEGER,
    references: {
      model: Post,
      key: 'id',
    }
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    }
  }
});

Post.hasMany(Comment);
Comment.belongsTo(Post, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
User.hasMany(Comment);
Comment.belongsTo(User, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

module.exports = Comment;