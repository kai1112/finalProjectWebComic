const UserModel = require('../models/user.model')
const ReviewMangaModel = require('../models/reviewManga')
const CategoryModel = require('../models/category.model')
const ReviewChapterModel = require('../models/reviewChapter')
const fs = require("fs");
const { mailCreateMangaAuthor } = require('../service/nodemail')

// view all manga author created  
module.exports.viewAllMangaAuthorCreated = async (req, res) => {
  try {
    const cookies = req.cookies;
    let user = await UserModel.findOne({ token: cookies.user })
    let allManga = await ReviewMangaModel.find({ author: user._id })
    if (!allManga) {
      let allManga = []
      res.render('pages/author/reviewManga/viewAllManga/viewAllManga', { allManga })
    } else {
      res.render('pages/author/reviewManga/viewAllManga/viewAllManga', { allManga, user: user.username })
    }
  } catch (e) {
    console.log(e)
  }
}

// view pages created manga
module.exports.viewMangaAuthorCreated = async (req, res) => {
  try {
    let category = await CategoryModel.find()
    // console.log(category);
    res.render('pages/author/reviewManga/createManga/createManga', { category })
  } catch (e) {
    console.log(e)
  }
}

// create manga
module.exports.createMangaAuthor = async (req, res) => {
  try {
    // const cookies = req.cookies;
    // let user = await UserModel.findOne({ token: cookies.user })
    console.log(44, req.user);
    let user = req.user
    console.log(44, user.status);
    if (user.status === 'active') {
      // console.log(41, req.files['backgroud_avatar']);
      let category = []
      let categoryID = req.body.categoryID.split(',')
      let categoryName = req.body.categoryName.split(',')
      const newManga = await ReviewMangaModel.findOne({ name: req.body.name });
      // console.log(categoryName);
      for (let i = 0; i < categoryName.length; i++) {
        category.push({ name: categoryName[i], id: categoryID[i] })
      }
      // console.log(41, category);
      if (newManga) {
        console.log({ message: 'manga already exists' });
      } else {
        let newManga = await ReviewMangaModel.create({
          avatar: "/" + req.files['avatar'][0].path,
          backgroud_avatar: "/" + req.files['backgroud_avatar'][0].path,
          name: req.body.name,
          category: category,
          author: user._id,
          description: req.body.description,
          price: req.body.price
        });
        console.log(71, newManga);
        await mailCreateMangaAuthor(user, newManga)
      }
    } else {
      console.log('The author is being banned for not having permission to create stories')
    }

    // console.log(68, subject);
    // console.log(70, 'aa');
    res.json({
      message: "create manga success",
      status: 200,
      err: false,
    });
  } catch (e) {
    // res.json(e)
    console.log(76, e)
  }
}

//view details manga
module.exports.viewDetails = async (req, res) => {
  try {
    // const cookies = req.cookies;
    // const user = await UserModel.findOne({ token: cookies.user });
    const manga = await ReviewMangaModel.findOne({ _id: req.params.id }).populate('author')
    // console.log(manga);
    const chapter = await ReviewChapterModel.find({ mangaID: req.params.id });
    // console.log(71, chapter);
    if (!manga) {
      res.json("no manga");
    } else {
      res.render("pages/author/reviewManga/viewDetails/viewDetails", {
        manga,
        chapter,
      });
      // console.log(manga);
    }
  } catch (err) {
    res.json("err");
  }
};

//edit manga
module.exports.viewEditManga = async (req, res) => {
  try {
    let manga = await ReviewMangaModel.findOne({ _id: req.params.id })
    // console.log(manga);
    res.render("pages/author/reviewManga/editManga/editManga", { manga });
  } catch (err) {
    console.log(err);
    // res.json(err);
  }
};

module.exports.editManga = async (req, res) => {
  const mangaID = req.params.id;
  try {
    const manga = await ReviewMangaModel.findOne({ _id: mangaID });
    let avatar, category, description, price
    // console.log(req.file);
    if (req.file == undefined) {
      avatar = manga.avatar
    } else {
      avatar = "/" + req.file.path
    }
    if (req.body.category === '') {
      category = manga.category
    } else {
      category = req.body.category
    }
    if (req.body.description === '') {
      description = manga.description
    } else {
      description = req.body.description
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
        message: "success"
      });
    }
  } catch (err) {
    res.json({ message: "error" });
  }
};


//delete manga
module.exports.deleteManga = async (req, res) => {
  const mangaID = req.params.id;
  // console.log(mangaID);
  try {
    const manga = await ReviewMangaModel.findOne({ _id: mangaID });
    const chapter = await ReviewChapterModel.find({ mangaID: manga._id })
    if (manga) {
      // console.log(manga.avatar.slice(1));
      // fs.unlinkSync(manga.avatar.slice(1))
      await ReviewMangaModel.findByIdAndDelete(manga._id);
      for (let i = 0; i < chapter.length; i++) {
        await ReviewChapterModel.findByIdAndDelete(chapter[i]._id);
      }
    } else {
      res.json({ message: "manga not found" });
    }
    res.json({
      status: 200,
      message: "delete manga success"
    });
  } catch (err) {
    res.json(err);
    console.log(err);
  }
};
