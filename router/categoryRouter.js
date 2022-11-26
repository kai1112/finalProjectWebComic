const router = require('express').Router();
const controller = require('../controllers/categoryController')

router.get('/viewCreate', controller.viewCreateCategory)
router.post('/create', controller.createCategory)
router.get('/viewAllCategory', controller.viewAllCategory)
router.get('/:id', controller.findMangaByCategory)
module.exports = router
