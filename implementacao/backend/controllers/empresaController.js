const { Empresa: EmpresaModel } = require("../models/Empresa")
const fetch = require("node-fetch");

const EmpresaController = {
    create: async (req, res) => {
        

        try {
            const { nome, email, senha, vantagens} = req.body
            var carteiraR = null

            await fetch(`http://localhost:3000/api/carteira`, {
                method: 'POST'
            })
                .then((resp) => carteiraR = resp.json())
            carteiraR.then(
                async result => {
                    let carteira = result.response
                    const empresa = {
                        nome, 
                        email, 
                        senha,
                        vantagens,
                        carteira 
                        }
                        response = await EmpresaModel.create(empresa),
                        res.status(201).json({ response, msg: "Empresa cadastrado com sucesso!" })
                }
            )
            
           
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
            const {nome, email, senha, vantagens} = req.body
            
            const empresa = {
                nome, 
                email, 
                senha,
                vantagens,
                carteira 
                }

            const updatedEmpresa = await EmpresaModel.findByIdAndUpdate(id, empresa)

            if(!updatedEmpresa) {
                res.status(404).json({ msg: "Empresa não encontrado!" })
                return
            }

            res.status(200).json({ updatedEmpresa, msg: "Empresa atualizado com sucesso!" })

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = EmpresaController