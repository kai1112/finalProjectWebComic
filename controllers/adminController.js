const UserModel = require('../models/user.model')
const fs = require("fs");
//view profile
module.exports.viewProfile = async (req, res) => {
  try {
    // khai bao bien cookies
    // 

    const cookies = req.cookies;
    const user = await UserModel.findOne({ token: cookies.user })
    if (user) {
      res.render('pages/admin/profileAdmin/profileAdmin', { user })
    } else {
      res.json('user chuwa dang nhap');
    }
  } catch (err) {
    res.json(err);
  }
}

// change profile
module.exports.ChangeUserName = async (req, res) => {

  let { newName } = req.body
  let userId = req.user._id
  try {


    await UserModel.updateOne({ _id: userId }, { username: newName })
    res.json({ mess: 'success' })
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports.ChangeUserDes = async (req, res) => {


  let { newDes } = req.body
  let userId = req.user._id
  // console.log(62, 'hello');
  try {
    await UserModel.updateOne({ _id: userId }, { discription: newDes })
    res.json({ mess: 'success' })
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports.ChangeUserAvatar = async (req, res) => {
  let userId = req.user._id
  try {
    let userInfo = await UserModel.findOne({ _id: userId })
    let path
    if (req.file == undefined) {
      path = userInfo.avatar
    } else {
      path = req.file.path;
      // console.log(51, userInfo.avatar.slice(1))
    }
    await UserModel.updateOne({ _id: userId }, { avatar: path })
    res.json({ mess: "success" })
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports.ChangeUserEmail = async (req, res) => {
  let { newEmail } = req.body
  let userId = req.user._id
  try {
    let findByEmail = await UserModel.find({ email: newEmail })
    if (findByEmail.length)
      return res.json({ mess: 'Email da ton tai' })
    await UserModel.updateOne({ _id: userId }, { email: newEmail })
    res.json({ mess: 'success' })
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports.ChangeUserPassword = async (req, res) => {
  let { oldPass, newPass } = req.body
  let userId = req.user._id
  try {
    let findUser = await UserModel.find({ _id: userId })
    const checkPassword = await bcrypt.compare(
      oldPass,
      findUser[0].password
    );
    if (!checkPassword)
      return res.json({ mess: 'Nhap sai password' })
    const password = await bcrypt.hash(newPass, 10);
    await UserModel.updateOne({ _id: userId }, { password })
    res.json({ mess: 'success' })
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports.Logout = async (req, res) => {
  try {
    res.clearCookie("user");
    res.render('components/login/login')
  } catch (error) {
    console.log(error);
    // res.json(error);
  }
}