const { Aluno: AlunoModel } = require("../models/Aluno")

const alunoController = {
    create: async (req, res) => {
        try {
            const { name, email, senha, cpf, rg, curso, endereco } = req.body

            const aluno = {
                name,
                email,
                senha,
                cpf,
                rg,
                curso,
                endereco,
                Object
            }

            const response = await AlunoModel.create(aluno);

            res.status(201).json({ response, msg: "Aluno cadastrado com sucesso!" })
        } catch (error) {
            console.log(error)
        }
    },
    getAll: async (req, res) => {
        try {
            const alunos = await AlunoModel.find()

            res.status(201).json(alunos)
        } catch (error) {
            console.log(error)
        }
    },
    get: async (req, res)=> {
        try {
            const id = req.params.id
            const aluno = await AlunoModel.findById(id)

            if(!aluno) {
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

            if(!aluno) {
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
            const { name, email, senha } = req.body
            
            const aluno = {
                name,
                email,
                senha,
                cpf,
                rg,
                curso,
                endereco,
                Object
            }

            const updatedAluno = await AlunoModel.findByIdAndUpdate(id, aluno)

            if(!updatedAluno) {
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