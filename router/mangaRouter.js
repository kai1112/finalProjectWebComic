const auth = require('../middleware/auth')
const router = require('express').Router();
const controller = require('../controllers/mangaController')
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


// manage author post
// view post manga
router.get('/viewCreateManga', auth.checkToken, auth.checkRoleAdmin, controller.viewCreateManga)
// view pagination post manga
router.get('/viewPaginationMangaAuthor', auth.checkToken, auth.checkRoleAdmin, controller.viewPaginationManga)
// view details manga
router.get('/viewDetailsAuthor/:id', auth.checkToken, auth.checkRoleAdmin, controller.viewDetailsManga)
// post manga
router.post('/createManga/:id', auth.checkToken, auth.checkRoleAdmin, controller.createManga)
// edit manga
router.get('/editMangaAuthor/:id', auth.checkToken, auth.checkRoleAdmin, controller.editMangaAuthor)

router.patch('/change-name/:id', auth.checkToken, auth.checkRoleAdmin, controller.ChangeMangaAuthorName)
router.patch('/change-des/:id', auth.checkToken, auth.checkRoleAdmin, controller.ChangeMangaAuthorDes)
router.post('/change-avatar/:id', auth.checkToken, auth.checkRoleAdmin, 
                                cpUpload, controller.ChangeMangaAuthorAvatar)
router.patch('/change-price/:id', auth.checkToken, auth.checkRoleAdmin, controller.ChangePrice)
//-------------------------------------------
//manage admin post
router.get('/viewAllManga', auth.checkToken, auth.checkRoleAdmin, controller.viewAllManga)
router.get('/viewPaginationManga', auth.checkToken, auth.checkRoleAdmin, controller.PaginationManga)
router.get('/editManga/:id', auth.checkToken, auth.checkRoleAdmin, controller.viewEditManga)

router.patch('/change-manga-name/:id', auth.checkToken, auth.checkRoleAdmin, controller.ChangeMangaName)
router.patch('/change-manga-des/:id', auth.checkToken, auth.checkRoleAdmin, controller.ChangeMangaDes)
router.post('/change-manga-avatar/:id', auth.checkToken, auth.checkRoleAdmin, upload.single('avatar'), controller.ChangeMangaAvatar)

router.get('/viewDetailManga/:id', auth.checkToken, auth.checkRoleAdmin, controller.viewDetailManga)
// router.get('/viewByAuthorName/:name', auth.checkToken, auth.checkRoleAdmin, controller.viewByAuthorName)

//-------------------------------------------
// manage manga User interface
router.get('/pagination', controller.userViewPagination)
router.get('/search', controller.search)
router.get('/:slug/checked', controller.ckecked)
router.get('/:slug', controller.userViewMangaDetail)
router.get('/:slug/:chap', controller.userViewChap)
router.get('/:slug/:chap/getPaginationComment', controller.getpaginationComment)
router.post('/updateManga', auth.checkToken, controller.updateManga)
router.get('/:slug/:chap/review', controller.preview)


module.exports = router