const { Carteira: CarteiraModel } = require("../models/Carteira")
const fetch = require("node-fetch");
const { Pessoa } = require("../models/Pessoa");

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
        const remetente = await Pessoa.findById(idRemetente)
        const destinatario = await Pessoa.findById(idDestinatario)


        let carteiraRemetente = await CarteiraModel.findById(remetente.carteira)
        let carteiraDestinatario = await CarteiraModel.findById(destinatario.carteira)
        
        if( remetente.saldo < valor){
            res.status(404).json({msg : "O saldo da conta não é suficiente para a transação"})
        }
        else{

            carteiraRemetente.saldo = carteiraRemetente.saldo - valor
            carteiraDestinatario.saldo = carteiraDestinatario.saldo + valor
            console.log(carteiraRemetente.saldo)
            carteiraRemetente.operacao.push({
                "descricao": descricao,
                "origem" : idRemetente,
                "destino" : idDestinatario,
                "valor": valor*-1,
                "data": new Date()
            }) 
            

            carteiraDestinatario.operacao.push({
                "descricao": descricao,
                "origem" : idRemetente,
                "destino" : idDestinatario,
                "valor": valor,
                "data": new Date()
            })
            

            const updatedRemetente = await CarteiraModel.findByIdAndUpdate(carteiraRemetente._id, carteiraRemetente, { new: true })
            const updateDestinatário = await CarteiraModel.findByIdAndUpdate(carteiraDestinatario._id, carteiraDestinatario, { new: true })

            
                res.status(200).json({ msg: "Transação realizada com sucesso!" })
                return
            
        }
        
    }
}

module.exports = carteiraController