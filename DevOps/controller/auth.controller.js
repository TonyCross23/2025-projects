const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashpassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password: hashpassword,
    });
    req.session.user = newUser;
    res.status(201).json({
      status: "Success",
      data: {
        user: newUser,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    req.session.user = user;
    if (isCorrect) {
      res.status(200).json({
        status: "Success",
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "username or password incorrect",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};
