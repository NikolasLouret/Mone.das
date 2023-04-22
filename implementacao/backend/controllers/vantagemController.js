const { Vantagem: VantagemModel } = require("../models/Vantagem")


const VantagemController = {
    create: async (req, res) => {
        const {nome, descricao, preco, foto} = req.body
        try {

            const vantagem = {
            nome, 
            descricao, 
            preco,
            foto   
            }

            const response = await VantagemModel.create(vantagem);

            res.status(201).json({ response, msg: "Vantagem cadastrado com sucesso!" })
        } catch (error) {
            console.log(error)
        }
    },
    getAll: async (req, res) => {
        try {
            const Vantagem = await VantagemModel.find()

            res.status(201).json(Vantagem)
        } catch (error) {
            console.log(error)
        }
    },
    get: async (req, res)=> {
        try {
            const id = req.params.id
            const vantagem = await VantagemModel.findById(id)

            if(!vantagem) {
                res.status(404).json({ msg: "Vantagem não encontrado!" })
                return
            }

            res.status(201).json(vantagem)
        } catch (error) {
            console.log(error)
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.query.id
            const vantagem = await VantagemModel.findById(id)

            if(!vantagem) {
                res.status(404).json({ msg: "Vanatagem não encontrado!" })
                return
            }

            const deletedVantagem = await VantagemModel.findByIdAndDelete(id)

            res.status(200).json({ deletedVantagem, msg: "Vantagem excluido com sucesso!" })
        } catch (error) {
            console.log(error)
        }
    },
    update: async (req, res) => {
        try {
            const id = req.query.id
            const {nome, descricao, preco, foto} = req.body
            
            const vantagem = {
                nome, 
                descricao, 
                preco,
                foto   
                }

            const updatedVantagem = await VantagemModel.findByIdAndUpdate(id, vantagem)

            if(!updatedVantagem) {
                res.status(404).json({ msg: "Vantagem não encontrado!" })
                return
            }

            res.status(200).json({ aluno, msg: "Vantagem atualizado com sucesso!" })

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = VantagemController