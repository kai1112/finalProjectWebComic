const router = require('express').Router();
const controller = require('../controllers/reportCommentController')

router.post('/createReportComment', controller.createReportComment)
router.get('/viewALlReportComment', controller.viewAllReportComment)

module.exports = router;