const multer = require("multer");
const auth = require('../middleware/auth')
const router = require('express').Router();
const controller = require('../controllers/userController')
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/uploads");
//   },
//   filename: function (req, file, cb) {
//     const arr = file.originalname.split(".");
//     const ext = arr[arr.length - 1];
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix + `.${ext}`);
//   },
// });
// const upload = multer({ storage: storage });

router.get('/userProfile', auth.checkToken, controller.viewProfile)
// router.post('/changeProfile/:id', upload.single('avatar'), controller.changeProfile)

// get all user
router.get('/getAllUsers', controller.getAllUsers)
// phaan tran user
router.get("/getPaginationUser", controller.getPaginationUser)
// ban user
router.post("/changeStatus", controller.banUser)
// search user
router.get("/findUserByName/:username", controller.getFindUserByNameUser)
// gift point
router.post("/giftPoint", controller.giftPointUser)
router.post("/removePoint", controller.revomePointUser)
//buyed
// router.get("/buyed", auth.checkToken, controller.buyed)
router.get("/buyed1", auth.checkToken, controller.buyed)
router.get("/logout", auth.checkToken, controller.logoutUser)
module.exports = router;