const { Carteira: CarteiraModel } = require("../models/Carteira")
const fetch = require("node-fetch")

const carteiraController = {
    create: async (req, res) => {
        try {

            const carteira = {
                "saldo": 0,
                "operacao": [
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
    get: async (req, res) => {
        try {
            const id = req.params.id
            const carteira = await CarteiraModel.findById(id)

            if (!carteira) {
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

            if (!carteira) {
                res.status(404).json({ msg: "Carteira não encontrado!" })
                return
            }

            const deletedCarteira = await CarteiraModel.findByIdAndDelete(id)

            res.status(200).json({ deletedCarteira, msg: "Carteira excluido com sucesso!" })
        } catch (error) {
            console.log(error)
        }
    },
    transacao: async (req, res) => {
        const {descricao, idRemetente, idDestinatario, valor } = req.body

        let remetente = await CarteiraModel.findById(idRemetente)
        let destinatario = await CarteiraModel.findById(idDestinatario)
        console.log(remetente)
        if( remetente.saldo < valor){
            res.status(404).json({msg : "O saldo da conta não é suficiente para a transação"})
        }
        else{

            remetente.saldo = remetente.saldo - valor
            destinatario.saldo = destinatario.saldo + valor

            remetente.operacao.push({
                "descricao": descricao,
                "origem" : idRemetente,
                "destino" : idDestinatario,
                "valor": valor*-1,
                "data": new Date()
            }) 
            

            destinatario.operacao.push({
                "descricao": descricao,
                "origem" : idRemetente,
                "destino" : idDestinatario,
                "valor": valor,
                "data": new Date()
            })
            

            const updatedRemetente = await CarteiraModel.findByIdAndUpdate(idRemetente, remetente, { new: true })
            const updateDestinatário = await CarteiraModel.findByIdAndUpdate(idDestinatario, destinatario, { new: true })

            
                res.status(200).json({ msg: "Transação realizada com sucesso!" })
                return
            
        }
        
    }
}

module.exports = carteiraController