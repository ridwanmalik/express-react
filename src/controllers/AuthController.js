const controller = {};
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + `/../.env` });

var sequelize = require("../model/Database");
var User = require("../model/User");

controller.login = async (req, res) => {
  if (!req.body.username && !req.body.email) {
    return res.status(400).json({
      success: false,
      msg: `Please Include Your Email Address Or Username To Connect To An Account`,
    });
  } else if (!req.body.password) {
    return res
      .status(400)
      .json({ success: false, msg: `Please Include Your Password` });
  }

  const response = await sequelize
    .sync()
    .then(() => {
      if (req.body.username) {
        const username = User.findOne({
          where: { username: req.body.username },
        });
        return username;
      } else if (req.body.email) {
        const email = User.findOne({ where: { email: req.body.email } });
        return email;
      }
    })
    .catch((err) => err);

  if (response) {
    bcrypt.compare(req.body.password, response.password, (err, result) => {
      if (err) {
        return res.json({ success: false, err, type: "bcrypt" });
      }
      if (result === true) {
        jwt.sign({ user: response }, process.env.API_KEY, (err, token) => {
          // return res.json({response, pass: req.body.password});
          if (err) {
            return res.json({ success: false, err, type: "jwt" });
          }
          return res.json({ success: true, token, data: response });
        });
      } else {
        return res.json({
          success: false,
          msg: "The Password That You've Entered Is Incorrect",
        });
      }
    });
  } else {
    return res.status(400).json({
      success: false,
      msg: `The Email Address Or Username You Entered Is Incorrect`,
    });
  }
};

controller.register = async (req, res) => {
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



module.exports = controller;
