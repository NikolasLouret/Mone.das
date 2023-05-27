const { Pessoa: PessoaModel } = require("../models/Pessoa");

const loginController = {
  login: async (req, res) => {
    try {
      const { email, senha } = req.body;
      const user = await PessoaModel.findOne({ email: email });

      if (!user) {
        res.status(404).json({ msg: "Usuário não encontrado!" });
        return;
      }

      if (senha !== user.senha) {
        res.status(401).json({ msg: "Senha inválida" });
        return;
      }

      res.status(201).json({ status: 201, user });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = loginController;
