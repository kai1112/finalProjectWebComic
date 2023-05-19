const LibraryModel = require("../models/library.model");
const UserModel = require("../models/user.model");
const { header } = require("../service/headerData");
const { refeshToken } = require("../service/refeshToken");
const BuyedModel = require("../models/buyed.model");
const MangaModel = require("../models/manga.model");
const ChapterModel = require("../models/chapter.model");
const commentModel = require("../models/comment.model");
const CommentModel = require("../models/comment.model");
const HistoryModel = require("../models/history.model");
const CategoryModel = require("../models/category.model");
const ReviewMangaModel = require("../models/reviewManga");
const ReviewChapterModel = require("../models/reviewChapter");
const fs = require("fs");
const slug = require("slugify");

// quản lý manga của author post
module.exports.createManga = async (req, res) => {
  try {
    // console.log(req.body, req.params);
    let manga = await ReviewMangaModel.findOne({ _id: req.params.id });
    let price = "";
    if (req.body.price === "") {
      price = manga.price;
    } else {
      price = req.body.price;
    }
    if (manga.stautus === "review") {
      await MangaModel.create({
        avatar: manga.avatar,
        backgroud_avatar: manga.backgroud_avatar,
        category: manga.category,
        name: manga.name,
        author: manga.author,
        reviewManga: manga._id,
        description: manga.description,
        views: manga.view,
        like: manga.like,
        price: price,
        slug: slug(manga.name),
      });
      await ReviewMangaModel.updateOne(
        { _id: req.params.id },
        { stautus: "posted" }
      );
      res.json({
        status: 200,
        message: "created successfully",
      });
    } else {
      console.log(12, "manga is posted");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.viewCreateManga = async (req, res) => {
  try {
    let allManga = await ReviewMangaModel.find();
    let listManga = await ReviewMangaModel.find().limit(10);
    let listAuthor = [];
    for (let i = 0; i < listManga.length; i++) {
      let author = await UserModel.findOne({ _id: listManga[i].author });
      listAuthor.push(author);
    }
    // console.log(47, listAuthor);
    let total = allManga.length;
    if (allManga) {
      res.render(
        "pages/admin/viewMangaAuthorPost/viewMangaAuthorPostEjs/viewMangaAuthorPost",
        { listAuthor, allManga, listManga, total: Math.ceil(total / 10) }
      );
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.viewPaginationManga = async (req, res) => {
  try {
    let listManga = await ReviewMangaModel.find()
      .skip(req.query.limit * (req.query.page - 1))
      .limit(req.query.limit);
    // console.log(listManga)

    let listAuthor = [];

    for (let i = 0; i < listManga.length; i++) {
      let author = await UserModel.findOne({ _id: listManga[i].author });
      listAuthor.push(author);
    }

    let total = listManga.length;

    if (listManga) {
      res.render(
        "pages/admin/viewMangaAuthorPost/viewMangaAuthorPostEjs/viewpaginationMangaAuthorPost",
        { total, listAuthor, listManga }
      );
    } else {
      res.json("khong co manga ton tai");
    }
  } catch (e) {
    console.log({ message: "Error getting pagination manga" });
  }
};

module.exports.editMangaAuthor = async (req, res) => {
  try {
    let manga = await ReviewMangaModel.findOne({ _id: req.params.id });
    let author = await UserModel.findOne({ id: manga.author });
    // console.log(manga);
    res.render(
      "pages/admin/viewMangaAuthorPost/editMangaAuthorPost/editManga",
      { manga, author }
    );
  } catch (e) {
    console.log(e);
  }
};

module.exports.viewDetailsManga = async (req, res) => {
  try {
    const manga = await ReviewMangaModel.findOne({
      _id: req.params.id,
    }).populate("author");
    // console.log(manga);
    const chapter = await ReviewChapterModel.find({ mangaID: req.params.id });
    // console.log(manga);
    // console.log(71, chapter);
    if (!manga) {
      res.json("ko co manga nao");
    } else {
      res.render(
        "pages/admin/viewMangaAuthorPost/viewDetailMangaAuthorPost/viewDetails",
        {
          manga,
          chapter,
        }
      );
      // console.log(manga);
    }
  } catch (err) {
    res.json("err");
  }
};

module.exports.ChangeMangaAuthorName = async (req, res) => {
  let { newName } = req.body;
  try {
    await refeshToken();

    await ReviewMangaModel.updateOne({ _id: req.params.id }, { name: newName });
    res.json({ mess: "success" });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.ChangeMangaAuthorDes = async (req, res) => {
  let { newDes } = req.body;

  try {
    await refeshToken();

    await ReviewMangaModel.updateOne(
      { _id: req.params.id },
      { description: newDes }
    );
    res.json({ mess: "success" });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.ChangeMangaAuthorAvatar = async (req, res) => {
  try {
    await refeshToken();

    let manga = await ReviewMangaModel.findOne({ _id: req.params.id });

    let path;
    if (req.file == undefined) {
      path = manga.avatar;
    } else {
      fs.unlinkSync(manga.avatar);
      path = req.file.path;
    }
    await ReviewMangaModel.updateOne({ _id: req.params.id }, { avatar: path });
    res.json({ mess: "success" });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.ChangePrice = async (req, res) => {
  let { Price } = req.body;
  try {
    await refeshToken();

    let manga = await ReviewMangaModel.updateOne(
      { _id: req.params.id },
      { price: Price }
    );
    res.json({ mess: "success" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// quản lý manga đã được tạo
// view all manga
module.exports.viewAllManga = async (req, res) => {
  try {
    let allManga = await MangaModel.find().populate("author");
    let listManga = await MangaModel.find().populate("author").limit(10);
    // console.log(101, allManga);
    let total = allManga.length;
    if (allManga) {
      res.render(
        "pages/admin/manageManga/viewAllManga/viewAllMangaEjs/viewAllManga",
        { allManga, listManga, total: Math.ceil(total / 10) }
      );
    } else {
      console.log("manga doesn't exist");
    }
  } catch (e) {
    console.log(e);
  }
};
// phân trang manga
module.exports.PaginationManga = async (req, res) => {
  try {
    let allManga = await MangaModel.find()
      .populate("author")
      .skip(req.query.limit * (req.query.page - 1))
      .limit(req.query.limit);
    console.log(216, req.query.limit * (req.query.page - 1));
    if (allManga) {
      res.render(
        "pages/admin/manageManga/viewAllManga/viewAllMangaEjs/paginationManga",
        { allManga }
      );
    } else {
      res.json("manga does not exist");
    }
  } catch (e) {
    console.log({ message: "Error getting pagination manga" });
  }
};
// edit manga
module.exports.viewEditManga = async (req, res) => {
  try {
    let manga = await MangaModel.findById(req.params.id);
    res.render("pages/admin/manageManga/editManga/editManga", { manga });
  } catch (e) {
    res.json(e);
  }
};

module.exports.viewDetailManga = async (req, res) => {
  try {
    const manga = await MangaModel.findOne({ _id: req.params.id }).populate(
      "author"
    );
    // console.log(manga);
    const chapter = await ChapterModel.find({ mangaID: req.params.id });
    if (!manga) {
      res.json("no manga");
    } else {
      res.render("pages/admin/manageManga/viewDetailManga/viewDetailManga", {
        manga,
        chapter,
      });
    }
  } catch (err) {
    res.json("err");
  }
};

module.exports.ChangeMangaName = async (req, res) => {
  let { newName } = req.body;
  // console.log(241, newName);
  try {
    await MangaModel.updateOne({ _id: req.params.id }, { name: newName });
    res.json({ status: 200 });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.ChangeMangaDes = async (req, res) => {
  let { newDes } = req.body;
  try {
    await MangaModel.updateOne({ _id: req.params.id }, { description: newDes });
    res.json({ mess: "success" });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.ChangeMangaAvatar = async (req, res) => {
  try {
    let manga = await MangaModel.findOne({ _id: req.params.id });
    let path;
    if (req.file == undefined) {
      path = manga.avatar;
    } else {
      path = req.file.path;
    }
    await MangaModel.updateOne({ _id: req.params.id }, { avatar: path });
    res.json({ mess: "success" });
  } catch (error) {
    res.status(500).json(error);
  }
};

//-----------------------------------------

module.exports.userViewMangaDetail = async (req, res) => {
  try {
    // console.log(req.cookies.user);
    // if (req.cookies.user) {
    // }

    let a = await header(req, res);
    // console.log(a.cookie.user);
    let mangaDetail = await MangaModel.findOne({
      slug: req.params.slug,
    }).populate("author");
    // console.log(318, mangaDetail);
    let manga = await MangaModel.find().sort({ views: "asc" });
    let category = await CategoryModel.find().sort({ name: "asc" });

    let userDetails;
    if (a?.cookie) {
      userDetails = await UserModel.findOne({ token: req.cookies.user });
    }
    let buyed = mangaDetail?.buyed;
    let checked = false;
    if (userDetails && buyed.length > 0) {
      let userID = buyed.filter((id) => {
        return id === userDetails.id;
      });
      if (userID[0] === userDetails.id) {
        // console.log(319, userID);
        checked = true;
      }
    }

    if (mangaDetail) {
      let chapter = await ChapterModel.find({ mangaID: mangaDetail.id });
      let followers = await LibraryModel.find({
        mangaID: mangaDetail._id,
      }).populate("userID");
      let comments = await CommentModel.find({
        mangaID: mangaDetail.slug,
      }).populate("userID");
      let comment, follow;
      if (userDetails) {
        // console.log(346, userDetails);
        follow = await LibraryModel.findOne({
          mangaID: mangaDetail._id,
          userID: userDetails.id,
        });
        comment = await CommentModel.find({
          mangaID: mangaDetail.slug,
          userID: userDetails.id,
        });
        let history = await HistoryModel.findOne({
          mangaID: mangaDetail.id,
          userID: userDetails._id,
        });
        if (history) {
          console.log("story has been added to history");
        } else {
          await HistoryModel.create({
            mangaID: mangaDetail.id,
            userID: a.userDetail.id,
          });
        }
      }
      // console.log(357, follow);
      res.render("pages/Home/page/page", {
        userDetail: a.userDetail,
        mangaDetail,
        chapter,
        followers,
        userDetails,
        follow,
        comments,
        comment,
        checked,
        manga,
        category,
        user: a.user,
      });
    } else {
      console.log(312, "chapter not found");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.userViewPagination = async (req, res) => {
  try {
    // console.log(req.query.page);
    let a = await header(req, res);
    let page = req.query.page;
    let listManga = await MangaModel.find()
      .skip(req.query.limit * (req.query.page - 1))
      .limit(req.query.limit);
    let allManga = await MangaModel.find();

    // console.log(368, req.query.limit * (req.query.page - 1));
    let total = Math.ceil(allManga.length / 20);
    let chapter = [];
    for (let i = 0; i < listManga.length; i++) {
      let chap = await ChapterModel.find({ mangaID: listManga[i]._id }).sort({
        chap: "asc",
      });
      chapter.push(chap);
    }
    let d = new Date();
    let listChapter = [];
    for (let i = 0; i < listManga.length; i++) {
      let listChap = await ChapterModel.find({ mangaID: listManga[i].id }).sort(
        { chap: "asc" }
      );
      listChapter.push(listChap);
    }
    if (listManga) {
      res.render("pages/Home/home/pagination", {
        d,
        listManga,
        chapter,
        listChapter,
        total,
        userDetail: a.userDetail,
        page,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.HomePage = async (req, res) => {
  try {
    let page = 1;
    let a = await header(req, res);
    let manga = await MangaModel.find().sort({ views: "desc" }).limit(5);
    let muaNhieu = await MangaModel.find().sort("buyed").limit(7);
    // console.log(muaNhieu);
    let comment = await CommentModel.find()
      .sort({ reaction: "desc" })
      .populate("userID")
      .populate({ path: "chapterID", populate: { path: "mangaID" } });
    // let Comment = [];
    // console.log(a);
    for (let i = 0; i < comment.length; i++) {
      for (let j = 1; j < comment.length; j++) {
        if (comment[i].reaction.length < comment[j].reaction.length) {
          let a = comment[i];
          comment[i] = comment[j];
          comment[j] = a;
        }
      }
    }

    // console.log(comment.length);

    for (let i = 0; i < comment.length; i++) {
      // console.log(i, comment[i].audio == "");
      console.log(393, comment[i].id);

      if (comment[i].audio == "") {
        // console.log(392, i, comment[i]);
        comment.splice(i, 1);
        i = i - 1;
        // console.log(i);
      }
    }
    // console.log(394, comment[1]);

    for (let i = 0; i < comment.length; i++) {
      // let k = comment[i]
      for (let j = i + 1; j < comment.length; j++) {
        // console.log(390, i, j);
        if (comment[i].userID == comment[j].userID) {
          // console.log(391 + i, comment[i]);
          comment.splice(j, 1);
        }
      }
    }
    // console.log(422, comment.length);

    let listManga = await MangaModel.find().sort({ views: "desc" }).limit(20);
    // console.log(418, listManga);
    let allManga = await MangaModel.find();
    let total = Math.ceil(allManga.length / 20);
    let chapter = [];
    for (let i = 0; i < manga.length; i++) {
      let chap = await ChapterModel.find({ mangaID: manga[i].id }).sort({
        chap: "asc",
      });
      chapter.push(chap);
    }
    let listChapter = [];
    for (let i = 0; i < listManga.length; i++) {
      let listChap = await ChapterModel.find({ mangaID: listManga[i].id }).sort(
        { chap: "asc" }
      );
      listChapter.push(listChap);
    }

    // console.log(chapter[2]);
    let d = new Date();
    res.render("pages/Home/home/home", {
      page,
      d,
      manga,
      listChapter,
      chapter,
      userDetail: a.userDetail,
      category: a.category,
      muaNhieu,
      user: a.user,
      comment,
      total,
      listManga,
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports.userViewChap = async (req, res) => {
  try {
    let a = await header(req, res);
    // console.log(367, a.data[0]._id.username);
    let manga = await MangaModel.find().sort({ views: "asc" });
    let mangaDetail = await MangaModel.findOne({
      slug: req.params.slug,
    }).populate("author");
    let allChapter = await ChapterModel.find({ mangaID: mangaDetail.id });
    let chapter = await ChapterModel.findOne({
      mangaID: mangaDetail.id,
      chap: req.params.chap,
    });
    let allComment = await commentModel
      .find({ chapterID: chapter.id })
      .populate("userID")
      .sort({ reactionn: "asc" });
    let comment = await commentModel
      .find({ chapterID: chapter.id })
      .populate("userID")
      .sort({ reactionn: "asc" })
      .limit(10);

    let total = Math.ceil((allComment.length + 1) / (comment.length + 1));
    let buyed = mangaDetail.buyed;
    let checked = false;
    let userDetail;

    if (a?.cookie) {
      userDetail = await UserModel.findOne({ token: a.cookie.user });
    }

    if (userDetail) {
      let userID = buyed.filter((id) => {
        return id === userDetail.id;
      });
      if (userID[0] === userDetail.id) {
        checked = true;
      } else {
        buyed.push(userDetail.id);
      }
    }

    if (mangaDetail.price > 0 && userDetail) {
      if (checked) {
        await ChapterModel.updateOne(
          { _id: chapter._id },
          { $inc: { views: 1 } }
        );
        await MangaModel.updateOne(
          { _id: chapter.mangaID },
          { $inc: { views: 1 } }
        );
        res.render("pages/Home/read/read", {
          userDetail,
          chapter,
          allChapter,
          comment,
          total,
          manga,
          category: a.category,
          user: a.user,
          mangaDetail,
        });
      } else if (userDetail.monney >= mangaDetail.price) {
        let monney = userDetail.monney - mangaDetail.price;
        await ChapterModel.updateOne(
          { _id: chapter._id },
          { $inc: { views: 1 } }
        );
        await MangaModel.updateOne(
          { _id: chapter.mangaID },
          { $inc: { views: 1 } }
        );
        await BuyedModel.create({
          userID: userDetail._id,
          mangaID: mangaDetail._id,
        });
        await MangaModel.findOneAndUpdate(
          { _id: mangaDetail._id },
          { buyed: buyed }
        );
        await UserModel.findOneAndUpdate(
          { _id: userDetail._id },
          { monney: monney }
        );
        res.render("pages/Home/read/read", {
          userDetail,
          chapter,
          allChapter,
          comment,
          total,
          manga,
          category: a.category,
          user: a.user,
          mangaDetail,
        });
      } else {
        console.log("you do not have enough money to buy stories");
      }
    } else if (mangaDetail.price > 0 && !a.userDetail) {
      console.log("You are not logged in");
    } else {
      await ChapterModel.updateOne(
        { _id: chapter._id },
        { $inc: { views: 1 } }
      );
      await MangaModel.updateOne(
        { _id: chapter.mangaID },
        { $inc: { views: 1 } }
      );
      res.render("pages/Home/read/read", {
        userDetail,
        chapter,
        allChapter,
        comment,
        total,
        manga,
        category: a.category,
        user: a.user,
        mangaDetail,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports.getpaginationComment = async (req, res) => {
  try {
    let manga = await MangaModel.findOne({ slug: req.params.slug });
    let chapter = await ChapterModel.findOne({
      mangaID: manga.id,
      chap: req.params.chap,
    });
    let allComment = await commentModel
      .find({ chapterID: chapter.id })
      .populate("userID")
      .sort({ reactionn: "asc" });
    let comment = await commentModel
      .find({ chapterID: chapter.id })
      .populate("userID")
      .sort({ reactionn: "asc" })
      .skip(req.query.limit * (req.query.page - 1))
      .limit(10);
    let total = Math.ceil((allComment.length + 1) / (comment.length + 1));

    if (chapter) {
      res.render("pages/Home/read/comment", { comment, total });
    } else {
      res.json("user does not exist");
    }
  } catch (e) {
    res.json({ message: "Error getting pagination user" });
  }
};

module.exports.search = async (req, res) => {
  try {
    let manga, manga1;
    manga = await MangaModel.find({
      name: { $regex: req.query.name, $options: "i" },
    }).populate("author");
    let author = await UserModel.findOne({
      username: { $regex: req.query.name, $options: "i" },
    });
    if (author) {
      manga1 = await MangaModel.find({ author: author.id });
    }
    res.render("components/headerHome/search", { manga: manga1 });
  } catch (e) {
    res.json(e);
  }
};

module.exports.updateManga = async (req, res) => {
  try {
    let manga = await MangaModel.findOne({ _id: req.body.id });

    if (manga) {
      let reaction = manga.like;
      let liked = [];
      if (reaction.length) {
        liked = reaction.filter((reaction) => {
          return reaction !== req.user.id;
        });
        if (reaction.length != liked.length) {
          reaction = liked;
        } else {
          reaction.push(req.user.id);
        }
      } else {
        reaction.push(req.user.id);
      }

      await MangaModel.findOneAndUpdate({ _id: manga._id }, { like: reaction });
      res.json({
        status: 200,
        message: "like manga successfully",
      });
    } else {
      res.json("manga not found");
    }
  } catch (err) {
    res.json(err);
  }
};

module.exports.preview = async (req, res) => {
  try {
    let a = await header(req, res);
    let manga = await MangaModel.find();
    let mangaDetail = await MangaModel.findOne({ slug: req.params.slug });
    let chapter = await ChapterModel.findOne({ mangaID: mangaDetail.id });

    let userDetail;
    if (a.cookie) {
      userDetail = await UserModel.findOne({ token: a.cookie.user });
    }

    let buyed = mangaDetail.buyed;
    let checked = false;
    if (userDetail) {
      let userID = buyed.filter((id) => {
        return id === userDetail.id;
      });
      if (userID[0] === userDetail.id) {
        checked = true;
      }
    }

    res.render("pages/Home/review/review", {
      userDetail,
      manga,
      category: a.category,
      user: a.user,
      chapter,
      mangaDetail,
      checked,
    });
  } catch (err) {
    res.json(err);
  }
};

module.exports.ckecked = async (req, res) => {
  try {
    let a = await header(req, res);
    let mangaDetail = await MangaModel.findOne({
      slug: req.params.slug,
    }).populate("author");
    let buyed = mangaDetail.buyed;
    let checked = false;
    let userDetail;

    if (a?.cookie) {
      userDetail = await UserModel.findOne({ token: a.cookie.user });
    }

    if (userDetail) {
      let userID = buyed.filter((id) => {
        return id === userDetail.id;
      });
      if (userID[0] === userDetail.id) {
        checked = true;
      } else {
        buyed.push(userDetail.id);
      }
    }
    res.json({ status: 200, data: checked });
  } catch (e) {
    res.json(e);
  }
};
// search by author name
// module.exports.viewByAuthorName = async (req, res) => {
//     try {
//         console.log('a');
//         let listAuthor = await UserModel.findOne({ username: req.params.name });
//         console.log(listAuthor);
//         let allManga = await ReviewMangaModel.find({ author: listAuthor.id })
//         res.render('pages/admin/viewMangaAuthorPost/viewMangaAuthorPostEjs/viewpaginationMangaAuthorPost.ejs', { allManga, listAuthor })
//     } catch (err) {
//         console.log(err);
//     }
// }

module.exports.refresh_token = async (req, res) => {
  try {
    let refresh_token = fs.readFileSync("./refresh_token.txt", "utf-8");
    let a = await axios({
      method: "POST",
      url: process.env.REFRESH_TOKEN,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        secret_key: process.env.SECRETKEY,
      },
      data: {
        refresh_token: refresh_token,
        app_id: process.env.APP_ID,
        grant_type: "refresh_token",
      },
    })
      .then((response) => {
        access_token = response.data.access_token;
        refresh_token = response.data.refresh_token;
        var a = response.data.refresh_token;

        fs.unlink("./refresh_token.txt", function (err) {});
        fs.unlink("./access_token.txt", function (err) {});
        fs.appendFile("./refresh_token.txt", refresh_token, function (err) {
          if (err) throw err;
        });
        fs.appendFile("./access_token.txt", access_token, function (err) {
          if (err) throw err;
        });
        return {
          access_token: access_token,
          refresh_token: refresh_token,
        };
      })
      .catch((error) => {
        log.error(`Error Try Catch Call Method Post: ${error}`);
        return false;
      });
    return a;
  } catch (err) {
    res.json(err);
  }
};
// refresh_token();
module.exports.sendMessage = async (req, res) => {
  try {
    let access_token = fs.readFileSync("./access_token.txt", "utf-8");
    axios({
      method: "POST",
      url: process.env.SEND_MESSAGE,
      headers: {
        "Content-Type": "application/json",
        access_token: access_token,
      },
      data: {
        recipient: {
          user_id: "2512523625412515",
        },
        message: {
          text: "hello!",
        },
      },
    })
      .then((response) => {
        res.json(response);
      })
      .catch((error) => {
        log.error(`Error Try Catch Call Method Post: ${error}`);
        return false;
      });
  } catch (err) {
    res.json(err);
  }
};

// sendMessage();

module.exports.webhook = async (req, res) => {
  return res.json(200);
};

module.exports.getAccessToken = async (req, res) => {
  console.log(req);
};
