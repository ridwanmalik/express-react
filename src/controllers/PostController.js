const controller = {};

var sequelize = require('../model/Database');
var User = require('../model/User');
var Post = require('../model/Post');
var Comment = require('../model/Comment');


controller.index = async (req, res) => {
  const response = await sequelize.sync().then(() => {
    const data = Post.findAll({ order: [['createdAt', 'DESC']], include: User });
    return data;
  }).catch(err => err);

  if (response) {
    return res.json({ success: true, data: response });
  } else {
    return res.status(400).json({ success: false, msg: `No Post Found` });
  }
};

controller.show = async (req, res) => {
  const response = await sequelize.sync().then(() => {
    const data = Post.findOne({ where: { id: req.params.id }, include: User });
    return data;
  }).catch(err => err);

  if (response) {
    return res.json({ success: true, data: response });
  } else {
    return res.status(400).json({ success: false, msg: `No Post Found With The ID Of ${req.params.id}` });
  }
};

controller.store = async (req, res) => {
  if (!req.body.postTitle) {
    return res.status(400).json({ success: false, msg: `Please Include A Post Title` });
  } else if (!req.body.postDesc) {
    return res.status(400).json({ success: false, msg: `Please Include A Post Description` });
  } else if (!req.body.postStatus) {
    return res.status(400).json({ success: false, msg: `Please Include A Post Status` });
  } else if (!(req.body.postStatus == "Draft" || req.body.postStatus == "Active" || req.body.postStatus == "Inactive")) {
    return res.status(400).json({ success: false, msg: `Post Status Invalid` });
  } else if (!req.body.postExpirationDate) {
    return res.status(400).json({ success: false, msg: `Please Include A Post Expiration Date` });
  } else if (!req.body.userId) {
    return res.status(400).json({ success: false, msg: `Please Include Your User Id` });
  }

  const response = await sequelize.sync().then(async () => {
    data = await Post.create({
      postTitle: req.body.postTitle,
      postDesc: req.body.postDesc,
      postStatus: req.body.postStatus,
      postExpirationDate: req.body.postExpirationDate,
      userId: req.body.userId,
    });
    return data;
  }).catch(err => err);

  if (response) {
    return res.status(201).json({ success: true, data: response, msg: "Post Created" });
  } else {
    return res.status(422).json({ success: false, msg: `Data Is Unprocessable` });
  }
};

controller.update = async (req, res) => {
  const response = await sequelize.sync().then(() => {
    const data = Post.findOne({ where: { id: req.params.id }, include: User });
    return data;
  }).catch(err => err);

  if (response) {
    if (!req.body.postTitle && !req.body.postDesc && !req.body.postStatus && !req.body.postExpirationDate) {
      return res.json({ success: true, data: response, msg: "Nothing To Update" });
    } else {
      const success = false;
    }

    if (req.body.postTitle) {
      success = await response.update({ postTitle: req.body.postTitle });
    }

    if (req.body.postDesc) {
      success = await response.update({ postDesc: req.body.postDesc });
    }

    if (req.body.postStatus) {
      success = await response.update({ postStatus: req.body.postStatus });
    }

    if (req.body.postExpirationDate) {
      success = await response.update({ postExpirationDate: req.body.postExpirationDate });
    }

    if (success) {
      return res.status(201).json({ success: true, data: response, msg: "Post Updated" });
    } else {
      return res.status(422).json({ success: false, msg: `Data Is Unprocessable` });
    }
  } else {
    return res.status(400).json({ success: false, msg: `No Post Found With The ID Of ${req.params.id}` });
  }
};

controller.delete = async (req, res) => {
  const response = await sequelize.sync().then(() => {
    const data = Post.findOne({ where: { id: req.params.id }, include: User });
    return data;
  }).catch(err => err);

  if (response) {
    const success = await response.destroy();
    if (success) {
      return res.status(200).json({ success: true, data: success, msg: "Post Deleted" });
    } else {
      return res.status(422).json({ success: false, msg: `Data Is Unprocessable` });
    }
  } else {
    return res.status(400).json({ success: false, msg: `No Post Found With The ID Of ${req.params.id}` });
  }
};

controller.comments = async (req, res) => {
  const response = await sequelize.sync().then(() => {
    const data = Comment.findAll({ where: { postId: req.params.id }, include: User });
    return data;
  }).catch(err => err);

  const postResponse = await sequelize.sync().then(() => {
    const postData = Post.findOne({ where: { id: req.params.id }, include: User });
    return postData;
  }).catch(err => err);

  if (response && postResponse) {
    return res.json({ success: true, data: response, parent: postResponse });
  } else {
    return res.status(400).json({ success: false, msg: `No Comment Found With The Post ID Of ${req.params.id}` });
  }
};

controller.storeComment = async (req, res) => {
  if (!req.body.body) {
    return res.status(400).json({ success: false, msg: `Please Include Your Comment` });
  } else if (!req.body.userId) {
    return res.status(400).json({ success: false, msg: `Please Include Your User Id` });
  }

  const postResponse = await sequelize.sync().then(() => {
    const postData = Post.findOne({ where: { id: req.params.id }, include: User });
    return postData;
  }).catch(err => err);

  const userResponse = await sequelize.sync().then(() => {
    const userData = User.findOne({ where: { id: req.body.userId } });
    return userData;
  }).catch(err => err);

  if (postResponse && userResponse) {
    const response = await sequelize.sync().then(async () => {
      data = await Comment.create({
        body: req.body.body,
        userId: req.body.userId,
        postId: req.params.id
      });
      return data;
    }).catch(err => err);

    if (response) {
      const responseWithUser = await response.getUser();
      return res.status(201).json({ success: true, data: responseWithUser, msg: "Comment Posted", parent: postResponse });
    } else {
      return res.status(422).json({ success: false, msg: `Data Is Unprocessable` });
    }
    return res.json({ success: true, data: response, parent: postResponse });
  } else {
    return res.status(400).json({ success: false, msg: `No Post Found With The ID Of ${req.params.id}` });
  }
};

module.exports = controller;