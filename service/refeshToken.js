const UserModel = require('../models/user.model');
// const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


module.exports.refeshToken = async function (req, res) {
    try {
        let cookie = req.cookies;

        // console.log(637, token);
        let searchTokenUser = await UserModel.findOne(
            { token: cookie.user }
        )

        if (searchTokenUser) {
            const newToken = jwt.sign({ id: searchTokenUser._id }, 'kai', { expiresIn: 10 })
            // console.log(52, token);
            var cookie1 = newToken
            await UserModel.findOneAndUpdate({ _id: searchTokenUser._id }, { token: newToken })
            res.cookie("user", newToken, { expires: new Date(Date.now() + 900000) });
            // res.json({ token: newToken })
        }
        return {
            cookie1
        }
    } catch (error) {
        console.log(error);
        // res.json(error)
    }
}