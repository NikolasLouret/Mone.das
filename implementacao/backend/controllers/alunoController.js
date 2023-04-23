const { Aluno: AlunoModel } = require("../models/Aluno")
const fetch = require("node-fetch")

const alunoController = {
    create: async (req, res) => {
        try {
            const { nome, email, senha, cpf, rg, instituicaoEnsino, curso, endereco } = req.body
            await fetch(`http://localhost:3000/api/carteira`, {
                method: 'POST'
            })
            .then(resp => { return resp.json() })
            .then(async result => {
                let carteira = result.response

                aluno = {
                    nome,
                    email,
                    senha,
                    cpf,
                    rg,
                    curso,
                    endereco,
                    instituicaoEnsino,
                    carteira
                }

                let response = await AlunoModel.create(aluno)
                response = await response.populate("instituicaoEnsino")
                response = await response.populate("carteira")
                
                res.status(201).json({ response, msg: "Aluno cadastrado com sucesso!" })
            })
        } catch (error) {
            console.log(error)
        }
    },
    getAll: async (req, res) => {
        try {
            const alunos = await AlunoModel.find().populate("carteira").populate("instituicaoEnsino")

            res.status(201).json(alunos)
        } catch (error) {
            console.log(error)
        }
    },
    get: async (req, res) => {
        try {
            const id = req.params.id
            const aluno = await AlunoModel.findById(id).populate("carteira").populate("instituicaoEnsino")

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
            const { email, senha, endereco, instituicaoEnsino, curso } = req.body

            const aluno = {
                email,
                senha,
                endereco,
                instituicaoEnsino,
                curso
            }

            const updatedAluno = await AlunoModel.findByIdAndUpdate(id, aluno, { new: true })

            if (!updatedAluno) {
                res.status(404).json({ msg: "Usuário não encontrado!" })
                return
            }

            let response = await updatedAluno.populate("instituicaoEnsino")
            response = await response.populate("carteira")

            console.log(response)

            res.status(200).json({ response, msg: "Usuário atualizado com sucesso!" })

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = alunoController