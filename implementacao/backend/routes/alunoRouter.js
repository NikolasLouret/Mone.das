const router = require("express").Router();
const alunoController = require("../controllers/alunoController");

// CREATE aluno
router.route("/aluno").post((req, res) => alunoController.create(req, res));

// GET ALL aluno
router.route("/aluno").get((req, res) => alunoController.getAll(req, res));

// GET aluno
router.route("/aluno/:id").get((req, res) => alunoController.get(req, res));

// GET aluno by ID Pessoa
router
  .route("/aluno/pessoa/:id")
  .get((req, res) => alunoController.getByIdPessoa(req, res));

// DELETE aluno
router.route("/aluno").delete((req, res) => alunoController.delete(req, res));

// UPDATE aluno
router.route("/aluno").put((req, res) => alunoController.update(req, res));

module.exports = router;
