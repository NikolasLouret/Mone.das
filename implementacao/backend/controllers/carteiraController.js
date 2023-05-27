const { Carteira: CarteiraModel } = require("../models/Carteira")
const fetch = require("node-fetch");
const { Pessoa } = require("../models/Pessoa");
const nodemailer = require('nodemailer');
const { text } = require("express");
const internoController = require("./internoController");
const transport = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
        user: '',
        pass: ''
    }
});
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
            const carteiraData = await CarteiraModel.findById(id)

            carteiraData.operacao.sort((date1, date2) => {
                return date2.data - date1.data
            })

            if (!carteiraData) {
                res.status(404).json({ msg: "Carteira não encontrado!" })
                return
            }

            var carteira = await carteiraData.populate({ path: 'operacao.origem', select: 'nome email tipo' }),
                carteira = await carteiraData.populate({ path: 'operacao.destino', select: 'nome email tipo' })

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
            const data = new Date()
            
            let idIncremente = await internoController.getId();
            idIncremente = idIncremente.incrementeId
            const codigoOperacao = remetente._id + idIncremente;
            const transacao = {
                codigoOperacao,
                descricao,
                tipo: 'transferencia',
                origem,
                destino,
                valor,
                data: data
            }
            await internoController.incrementeId();
            remetente.carteira.operacao.push(transacao)
            
            transacao.tipo = 'recebimento'
            destinatario.carteira.operacao.push(transacao)

            const carteiraAtualizada = await CarteiraModel.findByIdAndUpdate(remetente.carteira._id, remetente.carteira.toJSON(), { new: true }).exec()
            await CarteiraModel.findByIdAndUpdate(destinatario.carteira._id, destinatario.carteira.toJSON(), { new: true }).exec()
            transport.sendMail({
                sender: `Aluno <${destinatario.email}>`,
                to: `${destinatario.email}`,
                subject: 'Transação realizada',
                html: `<p>Você recebeu ${valor} moedas de ${remetente.nome}</p>`,
                text: `Você recebeu ${valor} moedas de ${remetente.nome}`
            }).then(()=>{console.log("Emai enviado")})
            .catch((err)=>{
                console.log(err)
            })
            res.status(200).json({ response: { remetente, destinatario, saldo: carteiraAtualizada.saldo, transacao }, msg: "Transação realizada com sucesso!" })
        }
    }
}

module.exports = carteiraController