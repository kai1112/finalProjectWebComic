const reviewMangaModel = require("../models/reviewManga");
const ReviewChapterModel = require("../models/reviewChapter");
const { mailCreateNewChapterAuthor } = require('../service/nodemail')
// const UserModel = require("../models/user.model");
// const { refeshToken } = require("../service/refeshToken")

// create new chapter
module.exports.createChapter = async (req, res) => {
  try {
    let user = req.user
    if (user.status === "active") {
      const revieManga = await reviewMangaModel.findOne({ _id: req.params.id });
      let chapter = 1;
      const reviewChapter = await ReviewChapterModel.find({ mangaID: req.params.id })
      chapter = reviewChapter.length + 1;
      if (!revieManga) {
        res.json({ chapter: chapter });
      } else {
        // console.log(51, req.body);
        await ReviewChapterModel.create({
          chap: chapter,
          mangaID: req.params.id,
          title: req.body.title,
          content: req.body.content,
          views: 0,
        });
        let chapter1 = await ReviewChapterModel.findOne({ chap: chapter, mangaID: req.params.id })
        console.log(chapter1);
        await mailCreateNewChapterAuthor(user, chapter1, revieManga)
      }
      res.json({
        message: "create chapter success",
        status: 200,
        err: false,
      });
    } else {
      res.json('author khong co quyen tao chapter do dang bi ban')
    }
  } catch (err) {
    res.json({ message: "loi" });
  }
};

// view chapter create
module.exports.viewCreateChapter = async (req, res) => {
  try {
    res.render("pages/author/reviewChapter/createChapter/createChapter");
  } catch (e) {
    console.log(e);
  }
};

// edit chapter
module.exports.editChapter = async (req, res) => {
  try {
    const chapter = await ReviewChapterModel.findById(req.params.id);
    if (!chapter) {
      res.json({ message: "Chapter not found" });
    } else {
      await ReviewChapterModel.updateOne(req.body);
      res.json({ message: "Chapter update successfully" });
    }
  } catch (err) {
    res.json({ err });
  }
};

module.exports.viewEditchapter = async (req, res) => {
  try {
    let chapter = await ReviewChapterModel.findOne({ _id: req.params.id })
    // console.log(chapter);
    res.render("pages/author/reviewChapter/editChapter/editChapter", { chapter });
  } catch (err) {
    res.json({ err });
  }
};

// // delete chapter
module.exports.deleteChapter = async (req, res) => {
  // console.log(req.params.id);
  try {
    const chapter = await ReviewChapterModel.findOne({ _id: req.params.id });
    if (chapter) {
      await ReviewChapterModel.findByIdAndDelete(chapter._id);
      res.json({ message: "delete chapter successfully" });
    } else {
      res.json({ message: "Chapter not found" });
    }
  } catch (err) {
    res.json(err);
  }
};

// // view all chapter
module.exports.getChapter = async (req, res) => {
  try {
    let chapter = await ReviewChapterModel.findOne({ _id: req.params.id });
    let allChapter = await ReviewChapterModel.find({ mangaID: chapter.mangaID });
    let listChapter = await ReviewChapterModel.find({ mangaID: chapter.mangaID }).limit(1);
    // console.log(76, listChapter);
    let total = allChapter.length;
    res.render('pages/author/reviewChapter/viewDetailChapter/viewDetailChapter', { allChapter, listChapter, total: Math.ceil(total / 1) })
  } catch (err) {
    res.json({ message: "loix" });
  }
};

module.exports.paginationChapter = async (req, res) => {
  try {
    // console.log(85, req.params.id);
    // console.log(86, req.query)
    let chapter = await ReviewChapterModel.findOne({ _id: req.params.id });
    let listChapter = await ReviewChapterModel.find({ mangaID: chapter.mangaID }).skip(req.query.limit * (req.query.page - 1)).limit(req.query.limit);
    if (!listChapter) {
      // console.log(listChapter);
      console.log('chapter not found')
    } else {
      res.render('pages/author/reviewChapter/viewDetailChapter/paginationChapter', { listChapter })
    }
  } catch (e) {
    console.log(e)
  }
}