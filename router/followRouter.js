const router = require('express').Router();
const auth = require('../middleware/auth')
const controller = require('../controllers/followController')

router.get('/viewFollow', auth.checkToken, controller.viewAllFollows)
router.post('/addFollow', auth.checkToken, controller.createFollow)
router.delete('/unFollow', auth.checkToken, controller.unFollow)

module.exports = router;