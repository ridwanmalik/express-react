const Sequelize = require('sequelize');
var sequelize = require('./Database');


var tableName = 'user';
var User = sequelize.define(tableName, {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  website: Sequelize.STRING
}, {
  timeStamps: false
});

module.exports = User;