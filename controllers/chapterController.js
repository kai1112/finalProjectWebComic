const MangaModel = require("../models/manga.model");
const ChapterModel = require("../models/chapter.model");
const ReviewChapterModel = require("../models/reviewChapter");
const LibraryModel = require("../models/library.model");
const { noticeEmailNewChapter } = require("../service/nodemail");

// review chapter
module.exports.editChapter = async (req, res) => {
  try {
    let chapter = await ReviewChapterModel.findById(req.params.id);
    res.render("pages/admin/viewChapterAuthorPost/editChapter/editChapter", {
      chapter,
    });
  } catch (err) {
    res.json({ status: 500, data: err });
  }
};

// change title chapter
module.exports.ChangeChapterTitleAuthor = async (req, res) => {
  let { newName } = req.body;
  try {
    await ReviewChapterModel.updateOne(
      { _id: req.params.id },
      { title: newName }
    );
    res.json({ status: 200 });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.ChangeChapterContentAuthor = async (req, res) => {
  let { newDes } = req.body;
  try {
    await ReviewChapterModel.updateOne(
      { _id: req.params.id },
      { content: newDes }
    );
    res.json({ mess: "success" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// admin quan li
// create chapter by chapter author post
module.exports.createChapter = async (req, res) => {
  try {
    let chapter = await ReviewChapterModel.findOne({ _id: req.params.id });
    let manga = await MangaModel.findOne({ reviewManga: chapter.mangaID });
    console.log(manga);
    let follower = await LibraryModel.find({ mangaID: manga._id }).populate(
      "userID"
    );
    if (chapter.stautus === "review") {
      // create a new chapter from chapter author posted
      await ChapterModel.create({
        chap: chapter.chap,
        title: chapter.title,
        content: chapter.content,
        mangaID: manga._id,
      });
      let chapter1 = await ChapterModel.findOne({
        mangaID: manga._id,
        chapter: chapter.chap,
      });
      // gửi mail thông báo có chapter mới cho người follow
      await noticeEmailNewChapter(follower, chapter1, manga);
      // update chapter author post
      await ReviewChapterModel.updateOne(
        { _id: req.params.id },
        { stautus: "posted" }
      );
    } else {
      res.json({ status: 500, message: "manga has been posted" });
    }
    res.json({ status: 200, message: "post manga success" });
  } catch (err) {
    res.json({ status: 500, data: err });
  }
};

// delte chapter
module.exports.deleteChapter = async (req, res) => {
  try {
    const chapter = await ChapterModel.findOne({ _id: req.params.id }).populate(
      "mangaID"
    );
    if (chapter) {
      await ChapterModel.findByIdAndDelete(chapter._id);
      await ReviewChapterModel.findOneAndUpdate(
        { mangaID: chapter.mangaID.reviewManga, chap: chapter.chap },
        { stautus: "review" }
      );
      res.json({ message: "delete chapter successfully" });
    } else {
      res.json({ message: "Chapter not found" });
    }
  } catch (err) {
    res.json(err);
  }
};

module.exports.viewEditChapter = async (req, res) => {
  try {
    let chapter = await ChapterModel.findById(req.params.id);
    res.render("pages/admin/manageChapter/editChapter/editChapter", {
      chapter,
    });
  } catch (err) {
    res.json(err);
  }
};

module.exports.viewDetailChapter = async (req, res) => {
  try {
    let chapter = await ChapterModel.findOne({ _id: req.params.id });
    let allChapter = await ChapterModel.find({ mangaID: chapter.mangaID });
    let listChapter = await ChapterModel.find({
      mangaID: chapter.mangaID,
    }).limit(1);
    // console.log(76, listChapter);
    let total = allChapter.length;
    res.render(
      "pages/admin/manageChapter/viewDetailChapter/viewDetailChapter",
      { allChapter, listChapter, total: Math.ceil(total / 1) }
    );
  } catch (err) {
    res.json({ message: "error" });
  }
};

module.exports.viewDetailChapterRivew = async (req, res) => {
  try {
    let chapter = await ReviewChapterModel.findOne({ _id: req.params.id });
    let allChapter = await ReviewChapterModel.find({
      mangaID: chapter.mangaID,
    });
    // let listChapter = await ReviewChapterModel.find({ mangaID: chapter.mangaID }).limit(1);
    // console.log(76, chapter);
    let total = allChapter.length;
    res.render(
      "pages/admin/viewChapterAuthorPost/viewDetailChapter/viewDetailChapter",
      { allChapter, chapter, total: Math.ceil(total / 1) }
    );
  } catch (err) {
    res.json({ message: "error" });
  }
};

module.exports.ChangeChapterTitle = async (req, res) => {
  let { newName } = req.body;
  try {
    await ChapterModel.updateOne({ _id: req.params.id }, { title: newName });
    res.json({ status: 200 });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.ChangeChapterContent = async (req, res) => {
  let { newDes } = req.body;
  try {
    await ChapterModel.updateOne({ _id: req.params.id }, { content: newDes });
    res.json({ mess: "success" });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.viewDetailChapterPagination = async (req, res) => {
  try {
    // console.log(85, req.params.id);
    // console.log(86, req.query)
    let chapter = await ChapterModel.findOne({ _id: req.params.id });
    let listChapter = await ChapterModel.find({ mangaID: chapter.mangaID })
      .skip(req.query.limit * (req.query.page - 1))
      .limit(req.query.limit);
    if (!listChapter) {
      console.log("chapter not found");
    } else {
      res.render(
        "pages/admin/manageChapter/viewDetailChapter/paginationChapter",
        { listChapter }
      );
    }
  } catch (e) {
    console.log(e);
  }
};

// chapter user
// module.exports.viewChapter = async (req, res) => {
//     try {

//     } catch (err) {
//         res.json(err)
//     }
// }

// module.exports.viewPaginationChapter = async (req, res) => {
//     try {

//     } catch (err) {
//         res.json(err)
//     }
// }
