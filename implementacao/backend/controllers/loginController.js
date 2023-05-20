const { Pessoa: PessoaModel } = require("../models/Pessoa")


loginController = {

    login: async (req, res)=>{

            let {email, senha} = req.body
            let pessoaVerificar
            console.log(email)
            try{
                pessoaVerificar = await PessoaModel.findOne({email: email})
            }catch(err){
                console.log(err)
            }
            console.log(senha)
           console.log(pessoaVerificar)
            if(pessoaVerificar.senha == senha){
                res.status(201).json(pessoaVerificar)
            }else{
                res.status(404).json({msg: `Senha inválida`})
            }


        
    }
}

module.exports = loginController