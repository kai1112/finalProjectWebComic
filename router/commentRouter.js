const router = require('express').Router();
const auth = require('../middleware/auth')
const controller = require('../controllers/commentController')

const multer = require("multer");
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
const upload = multer(
    { storage: storage, limits: { fileSize: Infinity } },
    {
        fileFilter: function (req, file, cb) {
            if (!file.mimetype.includes("audio") || file !== "") {
                console.log(20, file.mimetype);
                return cb(new Error("khong phai audio"), false);
            }
            cb(null, true);
        },
    }
);



router.post('/createComment', upload.single('addfile'), auth.checkToken, controller.createComment)
router.post('/updateComment', auth.checkToken, controller.updateComment)
router.delete('/deleteComment', auth.checkToken, controller.deleteComment)
router.get('/commentHight', auth.checkToken, controller.viewHightComment)

module.exports = router