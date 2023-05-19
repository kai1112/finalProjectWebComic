const CommentModel = require("../models/comment.model");
const UserModel = require("../models/user.model");
const ReporCommenttModel = require("../models/reportComment.model");
module.exports.createComment = async (req, res) => {
  try {
    let user = req.user;
    let audio;
    let mimeType;
    if (req.file == undefined) {
      audio = "";
      mimeType = "";
    } else {
      audio = "/" + req.file.path;
      mimeType = req.file.mimetype;
    }
    if (user) {
      if (req.body.title === "" && audio === "") {
        res.json({ status: 400 });
      } else {
        if (!req.body.chapterID) {
          const comment = await CommentModel.create({
            userID: user.id,
            mangaID: req.body.MangaID,
            title: req.body.title,
            audio: audio,
            mimeType: mimeType,
            reaction: [],
          });
        } else {
          const comment = await CommentModel.create({
            userID: user.id,
            chapterID: req.body.chapterID,
            title: req.body.title,
            audio: audio,
            mimeType: mimeType,
            reaction: [],
          });
        }
        res.json({
          message: "create comment successfully",
          status: 200,
        });
      }
    }
  } catch (err) {
    res.json(err);
  }
};

module.exports.updateComment = async (req, res) => {
  try {
    let comment = await CommentModel.findOne({ _id: req.body.id });
    if (comment) {
      let reaction = comment.reaction;
      let liked = [];
      if (reaction.length) {
        liked = reaction.filter((reaction) => {
          return reaction !== req.user.id;
        });
        if (reaction.length != liked.length) {
          reaction = liked;
        } else {
          reaction.push(req.user._id);
        }
      } else {
        reaction.push(req.user._id);
      }
      await CommentModel.findOneAndUpdate(
        { _id: comment._id },
        { reaction: reaction }
      );
      res.json({
        status: 200,
        message: "like comment successfully",
      });
    } else {
      res.json("Comment not found");
    }
  } catch (err) {
    res.json(err);
  }
};

module.exports.deleteComment = async (req, res) => {
  try {
    let comment = await CommentModel.findOne({ _id: req.body.id });
    // if (comment.audio) {
    //     fs.unlinkSync(comment.audio);
    // }
    await CommentModel.findByIdAndDelete(comment._id);
    await ReporCommenttModel.deleteMany({ idComment: comment._id });
    res.json({
      message: "create comment successfully",
      status: 200,
    });
  } catch (err) {
    res.json(err);
  }
};

module.exports.viewHightComment = async (req, res) => {
  try {
    let comment = await CommentModel.find()
      .sort({ reaction: "desc" })
      .populate("userID")
      .populate({ path: "chapterID", populate: { path: "mangaID" } });
    // let Comment = [];
    for (let i = 0; i < comment.length; i++) {
      for (let j = 1; j < comment.length; j++) {
        if (comment[i].reaction.length < comment[j].reaction.length) {
          let a = comment[i];
          comment[i] = comment[j];
          comment[j] = a;
        }
      }
    }

    for (let i = 0; i < comment.length; i++) {
      if (comment[i].audio == "") {
        comment.splice(i, 1);
        i = i - 1;
      }
    }

    for (let i = 0; i < comment.length; i++) {
      // let k = comment[i]
      for (let j = i + 1; j < comment.length; j++) {
        if (comment[i].userID == comment[j].userID) {
          comment.splice(j, 1);
        }
      }
    }

    res.render("pages/admin/viewCommentHeight/viewComment", { comment });
  } catch (e) {
    res.json(e);
  }
};
