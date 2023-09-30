const { Pessoa: PessoaModel } = require('../models/Pessoa')

pessoaController = {
	create: async (req, res) => {
		const { nome, email, senha, tipo } = req.body
		await fetch(`http://localhost:3000/api/carteira`, {
			method: 'POST',
		})
			.then(resp => {
				return resp.json()
			})
			.then(async result => {
				let carteira = result.response

				try {
					let pessoa = {
						nome,
						email,
						senha,
						tipo,
						carteira,
					}

					let response = await PessoaModel.create(pessoa)

					res.status(201).json({ response, msg: 'Pessoa cadastrada com sucesso!' })
				} catch (error) {
					console.log(error)
				}
			})
	},
	getAll: async (req, res) => {
		try {
			const pessoas = await PessoaModel.find().populate('carteira')

			res.status(201).json(pessoas)
		} catch (error) {
			console.log(error)
		}
	},
	findById: async (req, res) => {
		try {
			const id = req.params.id
			const pessoa = await PessoaModel.findOne({ _id: id }).populate('carteira')

			if (!pessoa) {
				res.status(404).json({ msg: `Pessoa não encontrada!` })
				return
			}

			res.status(201).json(pessoa)
		} catch (error) {
			console.log(error)
		}
	},
	update: async (req, res) => {
		const { id, nome, email, senha } = req.body

		PessoaModel.findOneAndUpdate(id, nome, email, senha)
	},
}

module.exports = pessoaController
