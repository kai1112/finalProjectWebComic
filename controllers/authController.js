const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// show login form
module.exports.viewLogin = async (req, res) => {
  try {
    res.render('components/login/login')
  } catch (e) {
    res.json(e);
  }
}



module.exports.login = async (req, res) => {
  try {
    // console.log(req.body.href);
    const data = await UserModel.findOne({
      email: req.body.email,
    });

    if (data) {
      const checkPassword = await bcrypt.compare(
        req.body.password,
        data.password
      );
      if (checkPassword) {
        const UserID = data._id;
        const token = jwt.sign(`${UserID}`, "kai");
        await UserModel.updateOne(
          { _id: data._id },
          { token: token }
        );
        res.cookie("user", token, {
          expires: new Date(Date.now() + 60 * 60 * 24 * 60),
        });
        let user = await UserModel.findOne({ email: req.body.email })
        res.json({ role: user.role })
      } else {
        res.json({ message: " incorrect password" });
      }
    } else {
      res.json({ message: "login failed", status: 400, err: false });
    }
  } catch (err) {
    res.json(76, err);
  }

};

// view regiter
module.exports.viewRegister = async (req, res) => {
  try {
    res.render('components/register/register')
  } catch (err) {
    res.json(err);
  }
}

// register 
module.exports.register = async (req, res) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email })
    // console.log(user);
    if (user) {
      res.json({
        status: 400,
        message: 'email da ton tai',
      })
    } else {
      const password = await bcrypt.hash(req.body.password, 10);
      let newUser = await UserModel.create({
        username: req.body.username,
        password: password,
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        monney: 0,
        email: req.body.email,
        buyed: [],
        role: "user",
      });
      res.json({
        message: "login success",
        status: 200,
      });
    }

  } catch (err) {
    res.json(err);
  }
}