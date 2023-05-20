const router = require("express").Router()
const loginController = require("../controllers/loginController")

//LOGIN PESSOA
router.route("/login").get((req, res) => loginController.login(req, res))



module.exports = router;