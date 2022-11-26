const auth = require('../middleware/auth')
const router = require('express').Router();
const controller = require('../controllers/reviewMangaController')
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
const upload = multer({ storage: storage });

var cpUpload = upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'backgroud_avatar', maxCount: 1 },
]);
// view all managa author created
router.get('/viewAllManga', auth.checkToken, auth.checkRoleAuthor, controller.viewAllMangaAuthorCreated)
//view page author's create  manga 
router.get('/createManga', auth.checkToken, auth.checkRoleAuthor, controller.viewMangaAuthorCreated)
router.post('/createManga', auth.checkToken, auth.checkRoleAuthor, cpUpload, controller.createMangaAuthor)
// view detail manga
router.get('/viewDetails/:id', auth.checkToken, auth.checkRoleAuthor, controller.viewDetails)
// view edit manga
router.get('/editManga/:id', auth.checkToken, auth.checkRoleAuthor, controller.viewEditManga)
router.post('/editManga/:id', auth.checkToken, auth.checkRoleAuthor, upload.single('avatar'), controller.editManga)
router.delete('/deleteManga/:id', auth.checkToken, auth.checkRoleAuthor, controller.deleteManga)


module.exports = router