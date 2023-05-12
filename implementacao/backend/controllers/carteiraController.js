const { Carteira: CarteiraModel } = require("../models/Carteira")
const fetch = require("node-fetch");
const { Pessoa } = require("../models/Pessoa");

const carteiraController = {
    create: async (req, res) => {
        try {

            const carteira = {
                saldo: 0,
                operacao: []
            }

            const response = await CarteiraModel.create(carteira)

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
        const { descricao, origem, destino, valor } = req.body

        const remetente = await Pessoa.findById(origem).populate('carteira')
        const destinatario = await Pessoa.findById(destino).populate('carteira')

        if (!remetente || !destinatario) {
            res.status(404).json({ msg: 'Remetente ou destinatário não encontrado' })
            return
        }
        
        if(remetente.carteira.saldo < valor) {
            res.status(404).json({ msg : 'O saldo da conta não é suficiente para a transação' })
        } else {
            remetente.carteira.saldo = remetente.carteira.saldo - valor
            destinatario.carteira.saldo = destinatario.carteira.saldo + valor

            const transacao = {
                descricao,
                tipo: 'transferencia',
                origem,
                destino,
                valor,
                data: new Date()
            }
            remetente.carteira.operacao.push(transacao)

            transacao.tipo = 'recebimento'
            destinatario.carteira.operacao.push(transacao)

            const carteiraAtualizada = await CarteiraModel.findByIdAndUpdate(remetente.carteira._id, remetente.carteira.toJSON(), { new: true }).exec()
            await CarteiraModel.findByIdAndUpdate(destinatario.carteira._id, destinatario.carteira.toJSON(), { new: true }).exec()

            res.status(200).json({ response: { saldo: carteiraAtualizada.saldo, transacao }, msg: "Transação realizada com sucesso!" })
        }
    }
}

module.exports = carteiraController