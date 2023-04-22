const router = require("express").Router()

// Aluno router
const alunoRouter = require("./alunoRouter")
const carteiraRouter = require("./carteiraRouter")
const instituicaoEnsinoRouter = require("./instituicaoEnsinoRouter")
const professorRouter = require("./professorRouter")
const empresaRouter = require("./empresaRouter")
router.use("/", alunoRouter)
router.use("/", carteiraRouter)
router.use("/", instituicaoEnsinoRouter)
router.use("/", professorRouter)
router.use("/", empresaRouter)
module.exports = router