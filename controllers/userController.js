const UserModel = require("../models/user.model");
const MangaModel = require("../models/manga.model");
const CategoryModel = require("../models/category.model");
const fs = require("fs");
const { header } = require("../service/headerData");

const BuyedModel = require("../models/buyed.model");
//view profile

module.exports.viewProfile = async (req, res) => {
  try {
    //  //  //
    let a = await header(req, res);

    // khai bao bien cookies
    const cookies = req.cookies;
    // let a = await header(req, res)
    let userDetail = await UserModel.findOne({ token: cookies.user });
    let manga = await MangaModel.find();
    let category = await CategoryModel.find().sort({ name: "asc" });
    // let user = await UserModel.find().sort({ buyed: 'desc' }).limit(10)
    // console.log(17, a.cookie);
    const userProfile = await UserModel.findOne({ token: cookies.user });
    if (!a.user) {
      console.log("User is not logged in");
    } else {
      res.render("pages/user/profileUser/profileUser", {
        userDetail: userDetail,
        user: a.user,
        userProfile,
        manga,
        category: category,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// change profile
module.exports.changeProfile = async (req, res) => {
  try {
    let userID = req.params.id;
    let user = await UserModel.findOne({ _id: req.params.id });
    // console.log(26, user.avatar);
    if (user) {
      let user = await UserModel.updateOne({ _id: userID }, req.body);
      fs.unlinkSync(user.avatar);
      // console.log('Success');
      res.json({
        status: 200,
        message: "Success",
      });
    } else {
      res.status(400).json({
        message: "user not found",
      });
    }
  } catch (err) {
    console.log(err);
    // res.json(err);
  }
};

// get all users
module.exports.getAllUsers = async (req, res) => {
  try {
    let allUser = await UserModel.find();

    let listUsers = await UserModel.find().limit(10);
    let total = allUser.length;
    if (!allUser) {
      listUsers = {};
      res.render(
        "pages/admin/manageUser/viewAllUser/viewAllUserEjs/viewAllUser",
        { listUsers }
      );
    } else {
      res.render(
        "pages/admin/manageUser/viewAllUser/viewAllUserEjs/viewAllUser",
        { listUsers, total: Math.ceil(total / 10) }
      );
    }
  } catch (e) {
    res.json({ message: "khong co user" });
  }
};

// phaan trang user
module.exports.getPaginationUser = async (req, res) => {
  try {
    let listUsers = await UserModel.find()
      .skip(req.query.limit * (req.query.page - 1))
      .limit(req.query.limit);
    if (!listUsers) {
      res.json("user does not exist");
    } else {
      res.render(
        "pages/admin/manageUser/viewAllUser/viewAllUserEjs/paginationUser",
        { listUsers }
      );
    }
  } catch (e) {
    console.log({ message: "Error getting pagination user" });
  }
};

// ban user
module.exports.banUser = async (req, res) => {
  let status = "";
  try {
    let user = await UserModel.findOne({ _id: req.body.id });
    if (user.status === "active") {
      status = "banned";
    } else {
      status = "active";
    }

    if (!user) {
      res.json("user does not exist");
    } else {
      await UserModel.findOneAndUpdate(
        { _id: req.body.id },
        { status: status }
      );
    }
    res.json({
      status: 200,
      message: "Successfully",
    });
  } catch (e) {
    res.json({ message: "Error ban user" });
  }
};

// tang diem cho  user
module.exports.giftPointUser = async (req, res) => {
  try {
    //  //

    let user = await UserModel.findOne({ _id: req.body.id });
    let money = 0;
    money = Number(req.body.money) + user.monney;
    if (user) {
      await UserModel.findOneAndUpdate({ _id: req.body.id }, { monney: money });
    } else {
      res.json({ message: "User not found" });
    }
    res.json({ status: 200, message: "success" });
  } catch (e) {
    res.json({ message: "error adding money to user" });
  }
};
// tru diem cho  user neu cong nham
module.exports.revomePointUser = async (req, res) => {
  try {
    let user = await UserModel.findOne({ _id: req.body.id });
    let money = 0;
    money = +user.monney - Number(req.body.money);
    if (user) {
      await UserModel.findOneAndUpdate({ _id: req.body.id }, { monney: money });
    } else {
      res.json({ message: "User not found" });
    }
    res.json({ status: 200, message: "success" });
  } catch (e) {
    res.json({ message: "error adding money to user" });
  }
};
// find user by name
module.exports.getFindUserByNameUser = async (req, res) => {
  try {
    const listUsers = await UserModel.find({
      username: { $regex: req.params.username },
    });
    let allUser = await UserModel.find();
    let total = allUser.length;
    if (listUsers.length > 0) {
      res.render(
        "pages/admin/manageUser/viewAllUser/viewAllUserEjs/viewAllUser",
        { listUsers, total: Math.ceil(total / 10) }
      );
    } else {
      let listUsers = [];
      res.render(
        "pages/admin/manageUser/viewAllUser/viewAllUserEjs/viewAllUser",
        { listUsers, total: Math.ceil(total / 10) }
      );
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports.buyed = async (req, res) => {
  try {
    let userDetails = await UserModel.findOne({ token: req.cookies.user });
    let buyed = await BuyedModel.findOne({ userID: req.user._id }).populate(
      "userID"
    );
    let buyedManga = [];
    let category = await CategoryModel.find().sort({ name: "asc" });
    let userBuyed = await BuyedModel.aggregate([
      {
        $group: {
          _id: "$userID",
          count: { $sum: {} },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);
    let user = await UserModel.populate(userBuyed, { path: "_id" });
    let manga1 = await MangaModel.find().sort({ views: "desc" }).limit(5);
    if (buyed) {
      let manga = await BuyedModel.find({ userID: userDetails._id }).populate(
        "mangaID"
      );
      if (manga) {
        buyedManga = manga;
      }
      res.render("pages/user/buyed/buyed", {
        user: user,
        category,
        manga: manga1,
        userDetail: buyed.userID,
        buyed: buyedManga,
      });
    } else {
      res.render("pages/user/buyed/buyed", {
        user: user,
        category,
        manga: manga1,
        userDetail: userDetails,
        buyed: buyedManga,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("user");
    res.render("components/login/login");
  } catch (error) {
    console.log(251, error);
  }
};
