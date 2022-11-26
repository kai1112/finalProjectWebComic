const router = require('express').Router();
const multer = require("multer");
const auth = require('../middleware/auth')
const controller = require('../controllers/authorController')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
    // console.log(8, file);
  },
  filename: function (req, file, cb) {
    const arr = file.originalname.split(".");
    const ext = arr[arr.length - 1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + `.${ext}`);
  },
});
const upload = multer({ storage: storage });

router.get('/authorProfile', auth.checkToken, controller.viewProfile)
router.patch('/change-name', auth.checkToken, controller.ChangeUserName)
router.patch('/change-des', auth.checkToken, controller.ChangeUserDes)
router.post('/change-avatar', auth.checkToken, upload.single('avatar'), controller.ChangeUserAvatar)
router.patch('/change-email', auth.checkToken, controller.ChangeUserEmail)
router.patch('/change-password', auth.checkToken, controller.ChangeUserPassword)

// create author 
router.get('/viewCreateAuthor', auth.checkToken, auth.checkRoleAdmin, controller.viewCreateAuthor)
router.post('/createAuthor', auth.checkToken, auth.checkRoleAdmin, controller.createAuthor)
// get all author
router.get('/getAllAuthor', auth.checkToken, auth.checkRoleAdmin, controller.getAllAuthor)
router.post('/banAuthor', auth.checkToken, auth.checkRoleAdmin, controller.banAuthor)
// gift point author
router.post('/giftPointAuthor', auth.checkToken, auth.checkRoleAdmin, controller.giftPointAuthor)
// logout 
router.get('/logout', auth.checkToken, auth.checkRoleAuthor, controller.Logout)

module.exports = router;