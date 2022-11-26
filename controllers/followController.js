const Follow = require('../models/library.model')
const UserModel = require('../models/user.model')
const MangaModel = require('../models/manga.model')
const CategoryModel = require('../models/category.model')
module.exports.createFollow = async (req, res) => {
    try {
        if (req.user._id === null) {
            res.json({ message: 'ban chua dang nhap' })
        } else {
            let followed = await Follow.findOne({ userID: req.user._id, mangaID: req.body.id })
            if (followed) {
                await Follow.findOneAndDelete({
                    userID: req.user._id,
                    mangaID: req.body.id
                })
                res.json({ status: 200, message: 'unFollow successfully' })
            } else {
                await Follow.create({
                    status: 'Followed',
                    userID: req.user._id,
                    mangaID: req.body.id,
                })
                res.json({ status: 200, message: 'follow successfully' })
            }
        }
    } catch (err) {
        res.json(err)
    }
}

module.exports.unFollow = async (req, res) => {
    try {
        // console.log(30, req.body.id);
        let follow = await Follow.findOne({ _id: req.body.id })
        if (follow) {
            await Follow.findOneAndDelete({ _id: req.body.id })
        } else {
            console.log('follow not found');
        }
        res.json({ status: 200 })
    } catch (err) {
        res.json(err)
    }
}

module.exports.viewAllFollows = async (req, res) => {
    try {
        let manga = await MangaModel.find().sort({ views: 'asc' })
        // let userDetail = await UserModel.findOne({ _id: req.user._id })
        let userDetail = await UserModel.findOne({ _id: req.user._id })
        let category = await CategoryModel.find().sort({ name: 'asc' })
        let user = await UserModel.find().sort({ buyed: 'desc' }).limit(10)
        console.log(54);
        let follows = await Follow.find({ userID: req.user._id }).populate('mangaID')
        if (!follows) {
            // console.log(40, follows);
            console.log(42, 'follows not found');
        } else {
            res.render('pages/Home/follow/follow', { follows, category, userDetail: userDetail, manga, user: user })
        }
    } catch (err) {
        console.log(err)
    }
}