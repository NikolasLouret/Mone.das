const router = require("express").Router()
const carteiraController = require("../controllers/carteiraController")

// CREATE carteira
router.route("/carteira").post((req, res) => carteiraController.create(req, res))

// GET ALL carteira
router.route("/carteira").get((req, res) => carteiraController.getAll(req, res))

// GET carteira
router.route("/carteira/:id").get((req, res) => carteiraController.get(req, res))

// DELETE carteira
router.route("/carteira").delete((req, res) => carteiraController.delete(req, res))

// UPDATE carteira
router.route("/carteira").put((req, res) => carteiraController.update(req, res))

// TRANSACAO carteira
router.route("/carteira/transacao").put((req, res) => carteiraController.transacao(req, res))


module.exports = router;
