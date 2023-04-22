const router = require("express").Router()
const InstituicaoEnsinoController = require("../controllers/InstituicaoEnsinoController")

// CREATE carteira
router.route("/instituicaoEnsino").post((req, res) => InstituicaoEnsinoController.create(req, res))

// GET ALL instituicaoEnsino
router.route("/instituicaoEnsino").get((req, res) => InstituicaoEnsinoController.getAll(req, res))

// GET instituicaoEnsino
router.route("/instituicaoEnsino/:id").get((req, res) => InstituicaoEnsinoController.get(req, res))

// DELETE instituicaoEnsino
router.route("/instituicaoEnsino").delete((req, res) => InstituicaoEnsinoController.delete(req, res))

// UPDATE instituicaoEnsino
router.route("/instituicaoEnsino").put((req, res) => InstituicaoEnsinoController.update(req, res))


module.exports = router;
