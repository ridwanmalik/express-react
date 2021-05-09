const Sequelize = require('sequelize');
var sequelize = require('./Database');
var User = require('./User');


var tableName = 'post';
var Post = sequelize.define(tableName, {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  postTitle: Sequelize.STRING,
  postDesc: Sequelize.TEXT,
  postStatus: {
    type: Sequelize.ENUM,
    values: ['Draft', 'Active', 'Inactive']
  },
  postExpirationDate: Sequelize.DATE,
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    }
  }
});

User.hasMany(Post);
Post.belongsTo(User, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

module.exports = Post;