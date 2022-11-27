const router = require('express').Router();
const passport = require('passport');
const UserModel = require('../models/user.model')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken')

let a = ''

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOFLE_CALLBACK_URL,
    scope: ['profile', 'email']
},

    async function (accessToken, refreshToken, profile, cb) {
        // console.log(profile);
        const data = await UserModel.findOne({
            email: profile.emails.value,
        });
        if (!data) {
            let newUser = await UserModel.create({
                username: profile.displayName,
                name: profile.name.givenName,
                monney: 0,
                email: profile.emails.value,
                role: "user",
            });
        }
        console.log(30, profile);
        a = profile
        return cb(null, { data, profile });
    }
));


passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.username, name: user.name });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});



router.get('/login', passport.authenticate('google', {
    successRedirect: '/google/success',
    failureRedirect: '/auth/viewLogin',
}))
router.get('/success', async (req, res) => {
    try {
        console.log(55, a);
        const data = await UserModel.findOne({
            email: req.body.email,
        });
        console.log(61, data);
        const UserID = data._id;
        const token = jwt.sign(`${UserID}`, "kai");
        await UserModel.updateOne(
            { _id: data._id },
            { token: token }
        );
        res.cookie("user", token, {
            expires: new Date(Date.now() + 6000000),
        });
        res.redirect('/')
    } catch (e) {
        console.log(e);
    }
})
router.get('/login/federated/google', passport.authenticate('google'))

// router.get('/', HomePage)
module.exports = router