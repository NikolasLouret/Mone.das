const { Aluno: AlunoModel } = require('../models/Aluno')
const { Pessoa: PessoaModel } = require('../models/Pessoa')
const { PessoaControler } = require('../controllers/pessoaController')
const fetch = require('node-fetch')

const alunoController = {
	create: async (req, res) => {
		try {
			const { nome, email, senha, cpf, rg, instituicaoEnsino, curso, endereco } = req.body

			console.log(instituicaoEnsino)

			await fetch(`http://localhost:3000/api/pessoa`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					nome: nome,
					senha: senha,
					email: email,
					tipo: 'Aluno',
				}),
			})
				.then(resp => {
					return resp.json()
				})
				.then(async result => {
					let pessoa = result.response
					let aluno = {
						pessoa,
						cpf,
						rg,
						curso,
						endereco,
						instituicaoEnsino,
					}

					let response = await AlunoModel.create(aluno)

					res.status(201).json({ response, msg: 'Aluno cadastrado com sucesso!' })
				})
		} catch (error) {
			console.log(error)
		}
	},
	getAll: async (req, res) => {
		try {
			const alunos = await AlunoModel.find().populate('pessoa').populate('instituicaoEnsino')

			res.status(201).json(alunos)
		} catch (error) {
			console.log(error)
		}
	},
	get: async (req, res) => {
		try {
			const id = req.params.id
			const aluno = await AlunoModel.findById(id).populate('pessoa').populate('instituicaoEnsino')

			if (!aluno) {
				res.status(404).json({ msg: 'Usuário não encontrado!' })
				return
			}

			res.status(201).json(aluno)
		} catch (error) {
			console.log(error)
		}
	},
	getByEmail: async (req, res) => {
		try {
			const email = req.params.email
			const pessoa = await PessoaModel.findOne({ email })

			if (!pessoa) {
				res.status(404).json({ msg: 'Usuário não encontrado!' })
				return
			}

			let aluno = await AlunoModel.findOne({ pessoa: pessoa._id }, 'pessoa curso')

			aluno = await aluno.populate({
				path: 'pessoa',
				select: 'nome',
			})

			res.status(201).json(aluno)
		} catch (error) {
			console.log(error)
		}
	},
	getByIdPessoa: async (req, res) => {
		try {
			const id = req.params.id
			let aluno = await AlunoModel.findOne({ pessoa: id })

			if (!aluno) {
				res.status(404).json({ msg: 'Usuário não encontrado!' })
				return
			}

			aluno = await aluno.populate({
				path: 'pessoa',
				populate: {
					path: 'carteira',
					populate: {
						path: 'operacao.destino operacao.origem',
					},
				},
			})

			aluno = await aluno.populate('instituicaoEnsino')

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
				res.status(404).json({ msg: 'Usuário não encontrado!' })
				return
			}

			const deletedAluno = await AlunoModel.findByIdAndDelete(id)

			res.status(200).json({ deletedAluno, msg: 'Usuário excluido com sucesso!' })
		} catch (error) {
			console.log(error)
		}
	},
	update: async (req, res) => {
		try {
			const id = req.query.id
			const { nome, email, senha, endereco, instituicaoEnsino, curso } = req.body

			let pessoaAlunoUpdate = {
				nome,
				email,
				senha,
			}
			const alunoUpdate = {
				endereco,
				instituicaoEnsino,
				curso,
			}
			const updatedAluno = await AlunoModel.findByIdAndUpdate(id, alunoUpdate, {
				new: true,
			})

			const updatePessoaAluno = await PessoaModel.findByIdAndUpdate(updatedAluno.pessoa._id, pessoaAlunoUpdate, {
				new: true,
			})

			if (!updatedAluno || !updatePessoaAluno) {
				res.status(404).json({ msg: 'Usuário não encontrado!' })
				return
			}

			let response = await updatedAluno.populate({
				path: 'pessoa',
				populate: {
					path: 'carteira',
					populate: {
						path: 'operacao.destino operacao.origem',
					},
				},
			})
			response = await response.populate('instituicaoEnsino')

			res.status(200).json({ response, msg: 'Usuário atualizado com sucesso!' })
		} catch (error) {
			console.log(error)
		}
	},
}

module.exports = alunoController
