const { Pessoa: PessoaModel } = require("../models/Pessoa")

pessoaController = {

    create: async (req, res) => {
        const { nome, email, senha } = req.body

        await fetch(`http://localhost:3000/api/carteira`, {
            method: 'POST'
        })
            .then(resp => { return resp.json() })
            .then(async result => {

                let carteira = result.response
                try {
                    let pessoa = {
                        nome,
                        email,
                        senha,
                        carteira
                    }
                    let response = await PessoaModel.create(pessoa)
                    res.status(201).json({ response, msg: "Pessoa cadastrada com sucesso!" })
                } catch (error) {
                    console.log(error)
                }


            })

    },
    update: async (req,res) =>{
        const {id, nome, email, senha} = req.body

        PessoaModel.findOneAndUpdate()
    }
}


module.exports = pessoaController