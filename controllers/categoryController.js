const UserModel = require("../models/user.model");
const MangaModel = require("../models/manga.model");
const Reviewmanga = require("../models/reviewManga");
const CategoryModel = require("../models/category.model");
const slug = require("slugify");
const { header } = require("../service/headerData");

// view pages category
module.exports.viewCreateCategory = async (req, res) => {
  try {
    res.render("pages/category/createCategory/createCategory");
  } catch (err) {
    res.json({ status: 500, data: err });
  }
};

// create category
module.exports.createCategory = async (req, res) => {
  try {
    let category = await CategoryModel.find({ name: req.body.category });
    if (category.length) {
      res.json({ status: 202, message: "name category already exists" });
    } else {
      // create category
      await CategoryModel.create({
        name: req.body.category,
        description: req.body.description,
        slug: slug(req.body.category),
      });
      res.json({ status: 200 });
    }
  } catch (err) {
    res.json({ status: 500, data: err });
  }
};

// edit category
module.exports.editCategory = async (req, res) => {
  try {
    let category = await CategoryModel.findOne({ id: req.params.id });
    if (!category) {
      res.json({ status: 404, message: "category does not exist" });
    } else {
      // update category
      await CategoryModel.updateOne(
        { _id: category._id },
        { name: req.body.name, description: req.body.description }
      );
    }
    res.json({ status: 200, message: "update category success" });
  } catch (err) {
    res.json({ status: 500, data: err });
  }
};

// delete category
module.exports.deleteCategory = async (req, res) => {
  try {
    let manga = await MangaModel.findOne();
    let reviewmanga = await Reviewmanga.find();
    let category = await CategoryModel.findOne({ _id: req.params.id });
    if (category) {
      // delete category by id
      await CategoryModel.findOneAndDelete({ _id: category._id });
      for (let i = 0; i < reviewmanga.length; i++) {
        for (let j = 0; j < reviewmanga.category.length; j++) {
          if (reviewmanga.category[j] === category._id) {
            await Reviewmanga.findOneAndDelete({ _id: reviewmanga[i]._id });
          }
        }
      }
      for (let i = 0; i < manga.length; i++) {
        for (let j = 0; j < manga.category.length; j++) {
          if (manga.category[j] === category._id) {
            await MangaModel.findOneAndDelete({ _id: manga[i]._id });
          }
        }
      }
    } else {
      res.json({ status: 404, message: "category not found" });
    }
    res.json({ status: 200, message: "delete successfully" });
  } catch (err) {
    res.json({ status: 500, data: err });
  }
};

// view all categories
module.exports.viewAllCategory = async (req, res) => {
  try {
    let category = await CategoryModel.find();
    res.render("pages/category/viewAllCategory/viewAllCategory", { category });
  } catch (err) {
    res.json({ status: 500, data: err });
  }
};

// find manga by category
module.exports.findMangaByCategory = async (req, res) => {
  try {
    let a = await header(req, res);
    let category = await CategoryModel.find().sort({ name: "asc" });
    let manga = await MangaModel.find({ "category.id": req.params.id });
    res.render("pages/findByCategory/findByCategory", {
      manga,
      user: a.user,
      category,
      userDetail: a.userDetail,
    });
  } catch (err) {
    res.json({ status: 500, data: err });
  }
};
