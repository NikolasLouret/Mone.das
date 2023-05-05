const { Empresa: EmpresaModel } = require("../models/Empresa")
const { Pessoa: PessoaModel } = require("../models/Pessoa")
const fetch = require("node-fetch");

const EmpresaController = {
    create: async (req, res) => {
        try {
            const { nome, email, senha } = req.body

            await fetch(`http://localhost:3000/api/pessoa`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        'nome': nome,
                        'senha': senha,
                        'email': email
                    })
            })
            .then(resp => { return resp.json() })
            .then(async result => {
                    let pessoa = result.response
                    empresa = {
                        pessoa,
                        vantagens: []
                    }

                    let response = await EmpresaModel.create(empresa)

                    res.status(201).json({ response, msg: "Empresa cadastrado com sucesso!" })
            })
        } catch (error) {
            console.log(error)
    }},
    getAll: async (req, res) => {
        try {
            const empresas = await EmpresaModel.find()

            res.status(201).json(empresas)
        } catch (error) {
            console.log(error)
        }
    },
    get: async (req, res)=> {
        try {
            const id = req.params.id
            const empresa = await EmpresaModel.findById(id)

            if(!empresa) {
                res.status(404).json({ msg: "Empresa não encontrado!" })
                return
            }

            res.status(201).json(empresa)
        } catch (error) {
            console.log(error)
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.query.id
            const empresa = await EmpresaModel.findById(id)

            if(!empresa) {
                res.status(404).json({ msg: "Empresa não encontrado!" })
                return
            }

            const deletedEmpresa = await EmpresaModel.findByIdAndDelete(id)

            res.status(200).json({ deletedEmpresa, msg: "Empresa excluido com sucesso!" })
        } catch (error) {
            console.log(error)
        }
    },
    update: async (req, res) => {
        try {
            const id = req.query.id
            const { nome, email, senha, vantagens } = req.body

            let pessoaEmpresaUpdate = {
                nome,
                email,
                senha
            }
            const empresa = {
                vantagens
            }

            const updatedEmpresa = await EmpresaModel.findByIdAndUpdate(id, empresa, { new: true })
            const updatePessoaEmpresa = await PessoaModel.findByIdAndUpdate(updatedEmpresa.pessoa._id, pessoaEmpresaUpdate, {new: true})
            if(!updatedEmpresa || !updatePessoaEmpresa) {
                res.status(404).json({ msg: "Empresa não encontrado!" })
                return
            }

            let response = await updatedEmpresa.populate("carteira")
            
            if(updatedEmpresa.vantagens.length) {
                response = await response.populate("Vantagens")
            }

            res.status(200).json({ response, msg: "Empresa atualizado com sucesso!" })

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = EmpresaController