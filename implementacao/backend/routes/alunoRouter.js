const router = require("express").Router();
const alunoController = require("../controllers/alunoController");

// CREATE Aluno
router.route("/aluno").post((req, res) => alunoController.create(req, res));

// GET ALL Aluno
router.route("/aluno").get((req, res) => alunoController.getAll(req, res));

// GET Aluno
router.route("/aluno/:id").get((req, res) => alunoController.get(req, res));

// GET Aluno by ID Pessoa
router
  .route("/aluno/pessoa/:id")
  .get((req, res) => alunoController.getByIdPessoa(req, res));

// GET Aluno by Email
router
  .route("/aluno/email/:email")
  .get((req, res) => alunoController.getByEmail(req, res));

// DELETE Aluno
router.route("/aluno").delete((req, res) => alunoController.delete(req, res));

// UPDATE Aluno
router.route("/aluno").put((req, res) => alunoController.update(req, res));

module.exports = router;
