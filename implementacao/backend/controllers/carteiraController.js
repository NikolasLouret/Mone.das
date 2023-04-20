const { Carteira: CarteiraModel } = require("../models/Carteira")


const carteiraController = {
    create: async (req, res) => {
        try {

            const carteira = {
                "saldo": 0,
                "operacao": [
                    {"origem" : "nada",
                "destino": "nada",
            "valor": 10
            }
                ]
                
            }

            const response = await CarteiraModel.create(carteira);

            res.status(201).json({ response, msg: "Carteira cadastrado com sucesso!" })
        } catch (error) {
            console.log(error)
        }
    },
    getAll: async (req, res) => {
        try {
            const carteiras = await CarteiraModel.find()

            res.status(201).json(carteiras)
        } catch (error) {
            console.log(error)
        }
    },
    get: async (req, res)=> {
        try {
            const id = req.params.id
            const carteira = await CarteiraModel.findById(id)

            if(!carteira) {
                res.status(404).json({ msg: "Carteira não encontrado!" })
                return
            }

            res.status(201).json(carteira)
        } catch (error) {
            console.log(error)
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.query.id
            const carteira = await CarteiraModel.findById(id)

            if(!carteira) {
                res.status(404).json({ msg: "Carteira não encontrado!" })
                return
            }

            const deletedCarteira = await CarteiraModel.findByIdAndDelete(id)

            res.status(200).json({ deletedCarteira, msg: "Carteira excluido com sucesso!" })
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

module.exports = carteiraController