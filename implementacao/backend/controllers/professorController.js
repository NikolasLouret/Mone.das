const { Professor: ProfessorModel } = require("../models/Professor")
const { Carteira } = require("../models/Carteira")
const fetch = require("node-fetch");
const professorController = {
    create: async (req, res) => {
        try {
            const { nome, email, senha, cpf, rg, curso, departamento, instituicaoEnsino } = req.body
            var carteiraR = null
            await fetch(`http://localhost:3000/api/carteira`, {
                method: 'POST'
            })
                .then((resp) => carteiraR = resp.json())
            carteiraR.then(
                async result => {
                    let carteira = result.response
                    professor = {
                        nome,
                        email,
                        senha,
                        cpf,
                        rg,
                        curso,
                        departamento,
                        instituicaoEnsino,
                        carteira
                    },
                        console.log(professor),
                        response = await ProfessorModel.create(professor),
                        res.status(201).json({ response, msg: "Professor cadastrado com sucesso!" })
                }
            )






        } catch (error) {
            console.log(error)
        }
    },
    getAll: async (req, res) => {
        try {
            const professores = await ProfessorModel.find().populate("carteira")

            res.status(201).json(professores)
        } catch (error) {
            console.log(error)
        }
    },
    get: async (req, res) => {
        try {
            const id = req.params.id
            const professor = await ProfessorModel.findById(id).populate("carteira")

            if (!professor) {
                res.status(404).json({ msg: "Usuário não encontrado!" })
                return
            }

            res.status(201).json(professor)
        } catch (error) {
            console.log(error)
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.query.id
            const professor = await ProfessorModel.findById(id)

            if (!professor) {
                res.status(404).json({ msg: "Usuário não encontrado!" })
                return
            }

            const deletedProfessor = await ProfessorModel.findByIdAndDelete(id)

            res.status(200).json({ deletedProfessor, msg: "Usuário excluido com sucesso!" })
        } catch (error) {
            console.log(error)
        }
    },
    update: async (req, res) => {
        try {
            const id = req.query.id
            const { nome, email, senha, cpf, rg, curso, departamnto, instituicaoEnsino } = req.body

            const professor = {
                nome,
                email,
                senha,
                cpf,
                rg,
                curso,
                departamnto,
                instituicaoEnsino
            }

            const updatedProfessor = await ProfessorModel.findByIdAndUpdate(id, professor)

            if (!updatedProfessor) {
                res.status(404).json({ msg: "Usuário não encontrado!" })
                return
            }

            res.status(200).json({ professor, msg: "Usuário atualizado com sucesso!" })

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = professorController