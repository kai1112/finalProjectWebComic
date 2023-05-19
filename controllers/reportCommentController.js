const ReporCommenttModel = require("../models/reportComment.model");
const UserModel = require("../models/user.model");

module.exports.createReportComment = async (req, res) => {
  try {
    let user = await UserModel.findOne({ token: req.cookies.user });
    if (user) {
      let reportComment = await ReporCommenttModel.create({
        userID: user.id,
        idComment: req.body.id,
      });
      res.json({ status: 200 });
    } else {
      console.log("user does not exist");
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports.viewAllReportComment = async (req, res) => {
  try {
    let reports = await ReporCommenttModel.find()
      .populate("idComment")
      .populate("userID");
    // console.log(reports);
    if (reports) {
      res.render("pages/admin/viewReportComment/viewReportComment", {
        reports,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
