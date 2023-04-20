const router = require("express").Router()

// Aluno router
const alunoRouter = require("./alunoRouter")
const carteiraRouter = require("./carteiraRouter")


router.use("/", alunoRouter)
router.use("/", carteiraRouter)


module.exports = router