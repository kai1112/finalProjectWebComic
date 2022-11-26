const multer = require("multer");
const auth = require('../middleware/auth')
const router = require('express').Router();
const controller = require('../controllers/adminController')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    const arr = file.originalname.split(".");
    const ext = arr[arr.length - 1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + `.${ext}`);
  },
});
const upload = multer({ storage: storage });

router.get('/adminProfile', auth.checkToken, auth.checkRoleAdmin, controller.viewProfile)
router.patch('/change-name', auth.checkToken, auth.checkRoleAdmin, controller.ChangeUserName)
router.patch('/change-des', auth.checkToken, auth.checkRoleAdmin, controller.ChangeUserDes)
router.post('/change-avatar', auth.checkToken, auth.checkRoleAdmin, upload.single('avatar'), controller.ChangeUserAvatar)
router.patch('/change-email', auth.checkToken, auth.checkRoleAdmin, controller.ChangeUserEmail)
router.patch('/change-password', auth.checkToken, auth.checkRoleAdmin, controller.ChangeUserPassword)
router.get('/logout', auth.checkToken, auth.checkRoleAdmin, controller.Logout)

module.exports = router;