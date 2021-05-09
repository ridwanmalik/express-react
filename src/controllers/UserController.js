const controller = {};
const bcrypt = require("bcryptjs");

var sequelize = require('../model/Database');
var User = require('../model/User');
var Post = require('../model/Post');
var Comment = require('../model/Comment');


controller.index = async (req, res) => {
  const response = await sequelize.sync().then(() => {
    const data = User.findAll();
    return data;
  }).catch(err => err);

  if (response) {
    return res.json({ success: true, data: response });
  } else {
    return res.status(400).json({ success: false, msg: `No User Found` });
  }
};

controller.show = async (req, res) => {
  const response = await sequelize.sync().then(() => {
    const data = User.findOne({ where: { id: req.params.id } });
    return data;
  }).catch(err => err);

  if (response) {
    return res.json({ success: true, data: response });
  } else {
    return res.status(400).json({ success: false, msg: `No User Found With The ID Of ${req.params.id}` });
  }
};

controller.store = async (req, res) => {
  if (!req.body.username) {
    return res.status(400).json({ success: false, msg: `Please Include A Username` });
  } else if (!req.body.email) {
    return res.status(400).json({ success: false, msg: `Please Include A Email` });
  } else if (!req.body.password) {
    return res.status(400).json({ success: false, msg: `Please Include A Password` });
  } else if (!req.body.firstName) {
    return res.status(400).json({ success: false, msg: `Please Include Your First Name` });
  } else if (!req.body.lastName) {
    return res.status(400).json({ success: false, msg: `Please Include Your Last Name` });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  const response = await sequelize.sync().then(async () => {
    data = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      website: req.body.website
    });
    return data;
  }).catch(err => err);

  if (response) {
    return res.status(201).json({ success: true, data: response, msg: "User Created" });
  } else {
    return res.status(422).json({ success: false, msg: `Data Is Unprocessable` });
  }
};

controller.update = async (req, res) => {
  const response = await sequelize.sync().then(() => {
    const data = User.findOne({ where: { id: req.params.id } });
    return data;
  }).catch(err => err);

  if (response) {
    let success = false;
    if (!req.body.email && !req.body.firstName && !req.body.lastName && !req.body.website) {
      return res.json({ success: true, data: response, msg: "Nothing To Update" });
    } else {
      success = false;
    }

    if (req.body.email) {
      success = await response.update({ email: req.body.email });
    }

    if (req.body.firstName) {
      success = await response.update({ firstName: req.body.firstName });
    }

    if (req.body.lastName) {
      success = await response.update({ lastName: req.body.lastName });
    }

    if (req.body.website) {
      success = await response.update({ website: req.body.website });
    }

    if (success) {
      return res.status(201).json({ success: true, data: success, msg: "User Updated" });
    } else {
      return res.status(422).json({ success: false, msg: `Data Is Unprocessable` });
    }
  } else {
    return res.status(400).json({ success: false, msg: `No User Found With The ID Of ${req.params.id}` });
  }
};

controller.delete = async (req, res) => {
  const response = await sequelize.sync().then(() => {
    const data = User.findOne({ where: { id: req.params.id } });
    return data;
  }).catch(err => err);

  if (response) {
    const success = await response.destroy();
    if (success) {
      return res.status(200).json({ success: true, data: success, msg: "User Deleted" });
    } else {
      return res.status(422).json({ success: false, msg: `Data Is Unprocessable` });
    }
  } else {
    return res.status(400).json({ success: false, msg: `No User Found With The ID Of ${req.params.id}` });
  }
};

controller.posts = async (req, res) => {
  const response = await sequelize.sync().then(() => {
    const data = Post.findAll({ where: { userId: req.params.id } });
    return data;
  }).catch(err => err);

  const userResponse = await sequelize.sync().then(() => {
    const userData = User.findOne({ where: { id: req.params.id } });
    return userData;
  }).catch(err => err);

  if (response && userResponse) {
    return res.json({ success: true, data: response, parent: userResponse });
  } else {
    return res.status(400).json({ success: false, msg: `No Comment Found With The User ID Of ${req.params.id}` });
  }
};

controller.comments = async (req, res) => {
  const response = await sequelize.sync().then(() => {
    const data = Comment.findAll({ where: { userId: req.params.id }, include: Post });
    return data;
  }).catch(err => err);

  const userResponse = await sequelize.sync().then(() => {
    const userData = User.findOne({ where: { id: req.params.id } });
    return userData;
  }).catch(err => err);

  if (response && userResponse) {
    return res.json({ success: true, data: response, parent: userResponse });
  } else {
    return res.status(400).json({ success: false, msg: `No Comment Found With The User ID Of ${req.params.id}` });
  }
};

module.exports = controller;