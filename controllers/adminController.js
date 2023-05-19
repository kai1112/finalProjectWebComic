const UserModel = require("../models/user.model");
const fs = require("fs");

//view profile
module.exports.viewProfile = async (req, res) => {
  try {
    // khai bao bien cookies
    const cookies = req.cookies;
    // find user by cookie
    const user = await UserModel.findOne({ token: cookies.user });
    if (user) {
      res.render("pages/admin/profileAdmin/profileAdmin", { user });
    } else {
      res.json("user do not login");
    }
  } catch (err) {
    res.json(err);
  }
};

// change profile name
module.exports.ChangeUserName = async (req, res) => {
  let { newName } = req.body;
  let userId = req.user._id;
  try {
    // update user
    await UserModel.updateOne({ _id: userId }, { username: newName });
    res.json({ mess: "success" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// change profile description
module.exports.ChangeUserDes = async (req, res) => {
  let { newDes } = req.body;
  let userId = req.user._id;
  try {
    // update user
    await UserModel.updateOne({ _id: userId }, { discription: newDes });
    res.json({ mess: "success" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// change profile avatar
module.exports.ChangeUserAvatar = async (req, res) => {
  let userId = req.user._id;
  try {
    let userInfo = await UserModel.findOne({ _id: userId });
    let path;
    if (req.file == undefined) {
      path = userInfo.avatar;
    } else {
      path = req.file.path;
    }
    // update user
    await UserModel.updateOne({ _id: userId }, { avatar: path });
    res.json({ mess: "success" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// change profile email
module.exports.ChangeUserEmail = async (req, res) => {
  let { newEmail } = req.body;
  let userId = req.user._id;
  try {
    let findByEmail = await UserModel.find({ email: newEmail });
    if (findByEmail.length) return res.json({ mess: "Email already" });
    await UserModel.updateOne({ _id: userId }, { email: newEmail });
    res.json({ mess: "success" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// change profile password
module.exports.ChangeUserPassword = async (req, res) => {
  let { oldPass, newPass } = req.body;
  let userId = req.user._id;
  try {
    // find user
    let findUser = await UserModel.find({ _id: userId });
    // check password
    const checkPassword = await bcrypt.compare(oldPass, findUser[0].password);
    if (!checkPassword) return res.json({ mess: "password incorect" });
    const password = await bcrypt.hash(newPass, 10);
    // update password
    await UserModel.updateOne({ _id: userId }, { password });
    res.json({ mess: "success" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// logout
module.exports.Logout = async (req, res) => {
  try {
    res.clearCookie("user");
    res.render("components/login/login");
  } catch (error) {
    res.status(500).json(error);
  }
};
