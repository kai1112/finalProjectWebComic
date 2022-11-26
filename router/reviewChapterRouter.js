const auth = require('../middleware/auth')
const router = require('express').Router();
const controller = require('../controllers/reviewChapterController')

// using chapterController
router.get("/viewDetailChapter/:id", auth.checkToken, controller.getChapter);
router.get("/paginationChapter/:id", auth.checkToken, auth.checkRoleAuthor, controller.paginationChapter);
//create chapter
router.post("/createChapter/:id", auth.checkToken, auth.checkRoleAuthor, controller.createChapter);
router.get("/createChapter/:id", auth.checkToken, auth.checkRoleAuthor, controller.viewCreateChapter);
// edit chapter
router.post("/editChapter/:id", auth.checkToken, auth.checkRoleAuthor, controller.editChapter);
router.get("/editChapter/:id", auth.checkToken, auth.checkRoleAuthor, controller.viewEditchapter);
//deleteChapter
router.delete("/deleteChapter/:id", auth.checkToken, auth.checkRoleAuthor, controller.deleteChapter);
module.exports = router;
