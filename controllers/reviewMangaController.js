const UserModel = require("../models/user.model");
const ReviewMangaModel = require("../models/reviewManga");
const CategoryModel = require("../models/category.model");
const ReviewChapterModel = require("../models/reviewChapter");
const fs = require("fs");
const { mailCreateMangaAuthor } = require("../service/nodemail");
const { info } = require("console");

// view all manga author created
module.exports.viewAllMangaAuthorCreated = async (req, res) => {
  try {
    const cookies = req.cookies;
    let user = await UserModel.findOne({ token: cookies.user });
    let allManga = await ReviewMangaModel.find({ author: user._id });
    if (!allManga) {
      let allManga = [];
      res.render("pages/author/reviewManga/viewAllManga/viewAllManga", {
        allManga,
      });
    } else {
      res.render("pages/author/reviewManga/viewAllManga/viewAllManga", {
        allManga,
        user: user.username,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

// view pages created manga
module.exports.viewMangaAuthorCreated = async (req, res) => {
  try {
    let category = await CategoryModel.find();
    res.render("pages/author/reviewManga/createManga/createManga", {
      category,
    });
  } catch (e) {
    console.log(e);
  }
};

// create manga
module.exports.createMangaAuthor = async (req, res) => {
  try {
    let user = req.user;
    if (user.status === "active") {
      let category = [];
      let categoryID = req.body.categoryID.split(",");
      let categoryName = req.body.categoryName.split(",");
      const newManga = await ReviewMangaModel.findOne({ name: req.body.name });
      for (let i = 0; i < categoryName.length; i++) {
        category.push({ name: categoryName[i], id: categoryID[i] });
      }
      if (newManga) {
        console.log({ message: "manga already exists" });
        res.json({
          message: "manga already exists",
          status: 404,
          err: false,
        });
      } else {
        if (req.files["avatar"] == undefined) {
          res.json({
            message: "manga has no avatar",
            status: 404,
            err: false,
          });
        } else if (req.files["backgroud_avatar"] == undefined) {
          res.json({
            message: "manga has no backgroud-avatar",
            status: 404,
            err: false,
          });
        } else {
          let newManga = await ReviewMangaModel.create({
            avatar: "/" + req.files["avatar"][0].path,
            backgroud_avatar: "/" + req.files["backgroud_avatar"][0].path,
            name: req.body.name,
            category: category,
            author: user._id,
            description: req.body.description,
            price: req.body.price,
          });
          await mailCreateMangaAuthor(user, newManga);
          res.json({
            message: "create manga success",
            status: 200,
            err: false,
          });
        }
      }
    } else {
      console.log(
        "The author is being banned for not having permission to create stories"
      );
    }
  } catch (e) {
    res.json(e);
  }
};

//view details manga
module.exports.viewDetails = async (req, res) => {
  try {
    // const cookies = req.cookies;
    // const user = await UserModel.findOne({ token: cookies.user });
    const manga = await ReviewMangaModel.findOne({
      _id: req.params.id,
    }).populate("author");
    const chapter = await ReviewChapterModel.find({ mangaID: req.params.id });
    if (!manga) {
      res.json("no manga");
    } else {
      res.render("pages/author/reviewManga/viewDetails/viewDetails", {
        manga,
        chapter,
      });
    }
  } catch (err) {
    res.json("err");
  }
};

//edit manga
module.exports.viewEditManga = async (req, res) => {
  try {
    let manga = await ReviewMangaModel.findOne({ _id: req.params.id });
    res.render("pages/author/reviewManga/editManga/editManga", { manga });
  } catch (err) {
    res.json(err);
  }
};

module.exports.editManga = async (req, res) => {
  const mangaID = req.params.id;
  try {
    const manga = await ReviewMangaModel.findOne({ _id: mangaID });
    let avatar, category, description, price;
    if (req.file == undefined) {
      avatar = manga.avatar;
    } else {
      avatar = "/" + req.file.path;
    }
    if (req.body.category === "") {
      category = manga.category;
    } else {
      category = req.body.category;
    }
    if (req.body.description === "") {
      description = manga.description;
    } else {
      description = req.body.description;
    }

    if (!manga) {
      res.json({ message: "manga doesn't exist" });
    } else {
      await ReviewMangaModel.findOneAndUpdate(
        {
          _id: mangaID,
        },
        {
          avatar: avatar,
          category: category,
          description: description,
        }
      );
      res.json({
        status: 200,
        message: "success",
      });
    }
  } catch (err) {
    res.json({ message: "error" });
  }
};

//delete manga
module.exports.deleteManga = async (req, res) => {
  const mangaID = req.params.id;
  try {
    const manga = await ReviewMangaModel.findOne({ _id: mangaID });
    const chapter = await ReviewChapterModel.find({ mangaID: manga._id });
    if (manga) {
      await ReviewMangaModel.findByIdAndDelete(manga._id);
      for (let i = 0; i < chapter.length; i++) {
        await ReviewChapterModel.findByIdAndDelete(chapter[i]._id);
      }
    } else {
      res.json({ message: "manga not found" });
    }
    res.json({
      status: 200,
      message: "delete manga success",
    });
  } catch (err) {
    res.json(err);
  }
};
