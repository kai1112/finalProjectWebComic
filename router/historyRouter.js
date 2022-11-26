const auth = require('../middleware/auth')
const router = require('express').Router();
const controller = require('../controllers/historyController')

router.get('/viewHistory', auth.checkToken, controller.viewAllHistory)
router.delete('/unHistory', auth.checkToken, controller.unHistory)

module.exports = router;