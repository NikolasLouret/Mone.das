const router = require("express").Router()
const EmpresaController = require("../controllers/empresaController")

// CREATE carteira
router.route("/empresa").post((req, res) => EmpresaController.create(req, res))

// GET ALL instituicaoEnsino
router.route("/empresa").get((req, res) => EmpresaController.getAll(req, res))

// GET empresa
router.route("/empresa/:id").get((req, res) => EmpresaController.get(req, res))

// DELETE empresa
router.route("/empresa").delete((req, res) => EmpresaController.delete(req, res))

// UPDATE empresa
router.route("/empresa").put((req, res) => EmpresaController.update(req, res))


module.exports = router;
