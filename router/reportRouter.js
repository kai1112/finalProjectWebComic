const router = require('express').Router();
const auth = require('../middleware/auth')
const controller = require('../controllers/reportController')

router.post('/createReport', controller.createReport)
router.get('/viewALlReports', controller.viewAllReport)
router.post('/updateReport', controller.updateReport)

module.exports = router;