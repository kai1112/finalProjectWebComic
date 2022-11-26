const UserModel = require('../models/user.model')
const MangaModel = require('../models/manga.model')
const HistoryMModel = require('../models/history.model')
const CategoryModel = require('../models/category.model')

module.exports.unHistory = async (req, res) => {
    try {
        // console.log(8, req.body.id);
        let history = await HistoryMModel.findOne({ id: req.body.id })
        if (history) {
            await HistoryMModel.findOneAndDelete({ _id: req.body.id })
        } else {
            console.log('history not found');
        }
        res.json({ status: 200 })
    } catch (err) {
        res.json(err)
    }
}

module.exports.viewAllHistory = async (req, res) => {
    try {
        let manga = await MangaModel.find().sort({ views: 'asc' })
        let userDetail = await UserModel.findOne({ _id: req.user._id })
        let category = await CategoryModel.find().sort({ name: 'asc' })
        let user = await UserModel.find().sort({ buyed: 'desc' }).limit(10)
        let history = await HistoryMModel.find({ userID: req.user._id }).populate('mangaID')
        if (history) {
            res.render('pages/Home/history/history', { history, category, userDetail: userDetail, manga, user: user })
            // console.log(40, history);
        } else {
            console.log(42, 'history not found');
        }
    } catch (err) {
        console.log(err)
    }
}