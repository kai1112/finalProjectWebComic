const UserModel = require('../models/user.model')
const fs = require('fs');
const bcrypt = require('bcrypt');
// const { refeshToken } = require('../service/refeshToken')

//view profile
module.exports.viewProfile = async (req, res) => {
  try {
    // khai bao bien cookies
    const cookies = req.cookies;
    console.log(req.cookies);
    const user = await UserModel.findOne({ token: cookies.user })
    if (user) {
      res.render('pages/author/profileAuthor/profileAuthor', { user })
    } else {
      console.log('User is not logged in');
    }
  } catch (err) {
    console.log(err);
  }
}
// change profile

module.exports.ChangeUserName = async (req, res) => {
  let newName = req.body.newName
  let userId = req.user._id
  // console.log(newName);
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
    // console.log(userInfo.avatar);
    console.log(53, req.file);
    let path
    if (req.file == undefined) {
      path = userInfo.avatar
    } else {
      path = req.file.path;
    }
    // if (userInfo.avatar !== "") {
    //   fs.unlinkSync(userInfo.avatar)
    // }
    await UserModel.updateOne({ _id: userId }, { avatar: path })
    res.json({ status: 200 })
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
      return res.json({ mess: 'Email already exits' })
    await UserModel.updateOne({ _id: userId }, { email: newEmail })
    res.json({ status: 200 })
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
      return res.json({ mess: 'password incorect' })
    const password = await bcrypt.hash(newPass, 10);
    await UserModel.updateOne({ _id: userId }, { password })
    res.json({ mess: 'success' })
  } catch (error) {
    res.status(500).json(error)
  }
}

//view create author page
module.exports.viewCreateAuthor = async (req, res) => {
  try {
    res.render('pages/admin/createAuthor/createAuthor')
  } catch (err) {
    console.log(err);
  }
}

// create account
module.exports.createAuthor = async (req, res) => {
  try {
    let author = await UserModel.findOne({ email: req.body.email })
    let role = 'author'
    // console.log(role);
    if (author && author.role === 'user') {
      const password = await bcrypt.hash(req.body.password, 10)
      let data = await UserModel.create({
        username: req.body.username,
        email: req.body.email,
        password: password,
        role: role
      })

    } else if (!author) {
      const password = await bcrypt.hash(req.body.password, 10)
      let data = await UserModel.create({
        username: req.body.username,
        email: req.body.email,
        password: password,
        role: role
      })
      res.json({
        status: 200
      })
    } else {
      res.json('author already exists')
    }
  } catch (err) {
    console.log(err);
  }
}

// get  all author
module.exports.getAllAuthor = async (req, res) => {
  try {
    let allAuthor = await UserModel.find({ role: 'author' })
    // console.log(allUser)
    let listAuthor = await UserModel.find({ role: 'author' }).limit(10);
    let total = allAuthor.length;
    if (!allAuthor) {
      allAuthor = {}
      listAuthor = {}
      res.render('pages/admin/manageUser/viewAllUser/viewAllUserEjs/viewAllUser', { allAuthor, listAuthor })
    } else {
      res.render('pages/admin/manageAuthor/viewAllAuthorEjs/viewAllAuthor', { allAuthor, listAuthor, total: Math.ceil(total / 10) })
    }
  } catch (err) {
    console.log(err);
  }
}

// phaan trang author
module.exports.getPaginationAuthor = async (req, res) => {
  try {
    let allAuthor = await UserModel.find({ role: 'author' }).skip(req.query.limit * (req.query.page - 1)).limit(req.query.limit);
    if (!allAuthor) {
      res.json('khong co user ton tai')
    } else {
      res.render('pages/admin/manageUser/viewAllUser/viewAllUserEjs/viewAllUser', { allAuthor })
    }
  } catch (e) {
    console.log({ message: 'Error getting pagination user' });
  }

}

// ban user
module.exports.banAuthor = async (req, res) => {
  let status = ''
  try {
    // console.log(allUser)
    let user = await UserModel.findOne({ _id: req.body.id })
    // console.log(90, user.status === 'active');
    if (user.status === 'active') {
      status = 'banned'
    } else {
      status = 'active'
    }

    if (!user) {
      res.json('author does not exist')
    } else {
      await UserModel.findOneAndUpdate({ _id: req.body.id }, { status: status })
    }
    res.json({
      status: 200,
      message: 'Successfully'
    })
  } catch (e) {
    res.json({ message: 'Error ban user' });
  }
}

// tang diem cho  author
module.exports.giftPointAuthor = async (req, res) => {
  try {
    let user = await UserModel.findOne({ _id: req.body.id });
    let money = 0;
    money = Number(req.body.money) + user.monney
    if (user) {
      await UserModel.findOneAndUpdate({ _id: req.body.id }, { monney: money });
    } else {
      res.json({ message: "User not found" })
    }
    res.json({ status: 200, message: 'success' })

  } catch (e) {
    res.json({ message: 'error adding money to user' });
  }
}

module.exports.Logout = async (req, res) => {
  try {
    res.clearCookie("user");
    res.render('components/login/login')
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}