const router = require("express").Router()
const pessoaController = require("../controllers/pessoaController")

// CREATE pessoa
router.route("/pessoa").post((req, res) => pessoaController.create(req, res))

// GET ALL pessoa
router.route("/pessoa").get((req, res) => pessoaController.getAll(req, res))

// GET pessoa
router.route("/pessoa/:id").get((req, res) => pessoaController.findById(req, res))

// DELETE pessoa
router.route("/pessoa").delete((req, res) => pessoaController.delete(req, res))

// UPDATE pessoa
router.route("/pessoa").put((req, res) => pessoaController.update(req, res))




module.exports = router;