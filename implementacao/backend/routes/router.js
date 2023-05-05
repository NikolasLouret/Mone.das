const router = require("express").Router()

// Aluno router
const alunoRouter = require("./alunoRouter")
const carteiraRouter = require("./carteiraRouter")
const instituicaoEnsinoRouter = require("./instituicaoEnsinoRouter")
const professorRouter = require("./professorRouter")
const empresaRouter = require("./empresaRouter")
const pessoaRouter = require("./pessoaRouter")
router.use("/", alunoRouter)
router.use("/", carteiraRouter)
router.use("/", instituicaoEnsinoRouter)
router.use("/", professorRouter)
router.use("/", empresaRouter)
router.use("/", pessoaRouter)
module.exports = router