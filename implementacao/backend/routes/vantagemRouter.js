const router = require("express").Router()
const vantagemController = require("../controllers/vantagemController")

// CREATE vantagem
router.route("/vantagem").post((req, res) => vantagemController.create(req, res))

// GET ALL vantagem
router.route("/vantagens").get((req, res) => vantagemController.getAll(req, res))

// GET vantagem
router.route("/vantagem/:id").get((req, res) => vantagemController.get(req, res))

// DELETE vantagem
router.route("/vantagem").delete((req, res) => vantagemController.delete(req, res))

// UPDATE vantagem
router.route("/vantagem").put((req, res) => vantagemController.update(req, res))


module.exports = router;
