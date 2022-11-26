const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports.checkRoleAdmin = async (req, res, next) => {
    try {
        if (req.user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: 'role is not allowed' })
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports.checkRoleAuthor = async (req, res, next) => {
    try {
        if (req.user.role === 'author') {
            next();
        } else {
            res.status(403).json({ message: 'role is not allowed' })
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports.checkRoleUser = async (req, res, next) => {
    try {
        if (req.user.role === 'user') {
            next();
        } else {
            res.status(403).json({ message: 'role is not allowed' })
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports.checkToken = async (req, res, next) => {
    let searchTokenUser
    try {
        let token = req.cookies.user
        searchTokenUser = await UserModel.findOne(
            { token: token }
        )
        if (searchTokenUser) {
            let id = jwt.verify(token, 'kai')
            if (id) {
                delete searchTokenUser._doc.token
                delete searchTokenUser._doc.password
                req.user = searchTokenUser
                next()
            }
        } else {
            res.render('components/error')
        }
    } catch (error) {
        if (error.message == 'jwt expired') {
            res.json({ message: 'jwt expired' })
        } else {
            res.json(error)
        }
    }
}
