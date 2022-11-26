const UserModel = require('../models/user.model')
const CategoryModel = require('../models/category.model');
const BuyedModel = require('../models/buyed.model');


async function header(req, res) {
    try {
        const cookie = req.cookies;

        let userDetail = await UserModel.findOne({ token: cookie.user })
        if (!userDetail) {
            userDetail == ""
        }
        // console.log(userDetail);
        let category = await CategoryModel.find().sort({ name: 'asc' })
        // let userBuyed = await BuyedModel.find()
        let userBuyed = await BuyedModel.aggregate([
            {
                $group: {
                    "_id": "$userID",
                    count: { $sum: {} }
                }
            },
            {
                $sort: {
                    count: -1
                }
            }
        ])
        let user = await UserModel.populate(userBuyed, { path: "_id" })
        // console.log(12, data);
        return {
            category, user, cookie, userDetail
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = { header }