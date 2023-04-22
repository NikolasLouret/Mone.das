const router = require("express").Router()
const professorController = require("../controllers/professorController")

// CREATE professor
router.route("/professor").post((req, res) => professorController.create(req, res))

// GET ALL professor
router.route("/professor").get((req, res) => professorController.getAll(req, res))

// GET professor
router.route("/professor/:id").get((req, res) => professorController.get(req, res))

// DELETE professor
router.route("/professor").delete((req, res) => professorController.delete(req, res))

// UPDATE professor
router.route("/professor").put((req, res) => professorController.update(req, res))


module.exports = router;
