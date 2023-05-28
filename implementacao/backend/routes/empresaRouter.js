const router = require("express").Router();
const EmpresaController = require("../controllers/empresaController");

// CREATE carteira
router.route("/empresa").post((req, res) => EmpresaController.create(req, res));

// GET ALL instituicaoEnsino
router.route("/empresa").get((req, res) => EmpresaController.getAll(req, res));

// GET Empresa
router.route("/empresa/:id").get((req, res) => EmpresaController.get(req, res));

// GET Empresa by Id Pessoa
router
  .route("/empresa/pessoa/:id")
  .get((req, res) => EmpresaController.getByIdPessoa(req, res));

// DELETE Empresa
router
  .route("/empresa")
  .delete((req, res) => EmpresaController.delete(req, res));

// UPDATE Empresa
router.route("/empresa").put((req, res) => EmpresaController.update(req, res));

// CREATE VANTAGEM empresa
router
  .route("/empresa/vantagem/:id")
  .put((req, res) => EmpresaController.addVantagem(req, res));

module.exports = router;
