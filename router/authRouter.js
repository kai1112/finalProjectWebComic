const router = require("express").Router()
const controller = require("../controllers/authController")


// register router
router.post('/register', controller.register)
router.get('/viewRegister', controller.viewRegister)
// login router
router.post('/login', controller.login)
router.get('/viewLogin', controller.viewLogin)


module.exports = router;