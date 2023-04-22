const { Aluno: AlunoModel } = require("../models/Aluno")
const { Carteira } = require("../models/Carteira")
const fetch = require("node-fetch");
const alunoController = {
    create: async (req, res) => {
        try {
            const { nome, email, senha, cpf, rg, curso, endereco } = req.body
            var carteiraR = null
            await fetch(`http://localhost:3000/api/carteira`, {
                method: 'POST'
            })
                .then((resp) => carteiraR = resp.json())
            carteiraR.then(
                async result => {
                    let carteira = result.response
                    aluno = {
                        nome,
                        email,
                        senha,
                        cpf,
                        rg,
                        curso,
                        endereco,
                        carteira
                    },
                        console.log(aluno),
                        response = await AlunoModel.create(aluno),
                        res.status(201).json({ response, msg: "Aluno cadastrado com sucesso!" })
                }
            )






        } catch (error) {
            console.log(error)
        }
    },
    getAll: async (req, res) => {
        try {
            const alunos = await AlunoModel.find().populate("carteira")

            res.status(201).json(alunos)
        } catch (error) {
            console.log(error)
        }
    },
    get: async (req, res) => {
        try {
            const id = req.params.id
            const aluno = await AlunoModel.findById(id).populate("carteira")

            if (!aluno) {
                res.status(404).json({ msg: "Usuário não encontrado!" })
                return
            }

            res.status(201).json(aluno)
        } catch (error) {
            console.log(error)
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.query.id
            const aluno = await AlunoModel.findById(id)

            if (!aluno) {
                res.status(404).json({ msg: "Usuário não encontrado!" })
                return
            }

            const deletedAluno = await AlunoModel.findByIdAndDelete(id)

            res.status(200).json({ deletedAluno, msg: "Usuário excluido com sucesso!" })
        } catch (error) {
            console.log(error)
        }
    },
    update: async (req, res) => {
        try {
            const id = req.query.id
            const { nome,
                email,
                senha,
                cpf,
                rg,
                curso,
                endereco } = req.body

            const aluno = {
                nome,
                email,
                senha,
                cpf,
                rg,
                curso,
                endereco,
            }

            const updatedAluno = await AlunoModel.findByIdAndUpdate(id, aluno)

            if (!updatedAluno) {
                res.status(404).json({ msg: "Usuário não encontrado!" })
                return
            }

            res.status(200).json({ aluno, msg: "Usuário atualizado com sucesso!" })

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = alunoController