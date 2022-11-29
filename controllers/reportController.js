const MangaModel = require('../models/manga.model');
const ReportModel = require('../models/report.model');


module.exports.createReport = async (req, res) => {
    try {
        let manga = await MangaModel.findOne({ slug: req.body.slug })
        let user = await UserModel.findOne({ token: req.cookies.user })
        if (user) {
            let report = await ReportModel.create({
                content: req.body.content,
                userID: req.body.userID,
                mangaID: manga.id,
            })
            res.json({ status: 200, data: report })
        } else {
            console.log('manga does not exist');
        }
    } catch (e) {
        console.log(e);
    }
}

module.exports.viewAllReport = async (req, res) => {
    try {
        let reports = await ReportModel.find().populate('mangaID').populate('userID')
        // console.log(reports);
        if (reports) {
            res.render('pages/admin/viewReport/viewReport', { reports })
        }
    } catch (e) {
        console.log(e);
    }
}

module.exports.updateReport = async (req, res) => {
    try {
        let report = await ReportModel.findById(req.body.id)
        if (report) {
            await ReportModel.updateOne({ _id: req.body.id }, { status: "watched" })
        }
        res.json({ status: 200, message: 'Successfully' })
    } catch (e) {
        console.log(e);
    }
}

