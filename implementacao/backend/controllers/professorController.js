const { Professor: ProfessorModel } = require("../models/Professor");
const { Pessoa: PessoaModel } = require("../models/Pessoa");
const { Carteira } = require("../models/Carteira");
const fetch = require("node-fetch");
const professorController = {
  create: async (req, res) => {
    try {
      const {
        nome,
        email,
        senha,
        cpf,
        rg,
        curso,
        departamento,
        instituicaoEnsino,
      } = req.body;
      await fetch(`http://localhost:3000/api/pessoa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome,
          senha: senha,
          email: email,
          tipo: "Professor",
        }),
      })
        .then((resp) => resp.json())
        .then(async (result) => {
          let pessoa = result.response;
          (professor = {
            pessoa,
            cpf,
            rg,
            curso,
            departamento,
            instituicaoEnsino,
          }),
            (response = await ProfessorModel.create(professor)),
            res
              .status(201)
              .json({ response, msg: "Professor cadastrado com sucesso!" });
        });
    } catch (error) {
      console.log(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const professores = await ProfessorModel.find().populate("carteira");

      res.status(201).json(professores);
    } catch (error) {
      console.log(error);
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params.id;
      const professor = await ProfessorModel.findById(id).populate("carteira");

      if (!professor) {
        res.status(404).json({ msg: "Usuário não encontrado!" });
        return;
      }

      res.status(201).json(professor);
    } catch (error) {
      console.log(error);
    }
  },
  getByEmail: async (req, res) => {
    try {
      const email = req.params.email;
      let professor = await ProfessorModel.findOne({ email });

      if (!professor) {
        res.status(404).json({ msg: "Usuário não encontrado!" });
        return;
      }

      professor = await professor.populate({
        path: "pessoa",
        populate: {
          path: "carteira",
          populate: {
            path: "operacao.destino operacao.origem",
          },
        },
      });

      professor = await professor.populate("instituicaoEnsino");

      res.status(201).json(professor);
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.query.id;
      const professor = await ProfessorModel.findById(id);

      if (!professor) {
        res.status(404).json({ msg: "Usuário não encontrado!" });
        return;
      }

      const deletedProfessor = await ProfessorModel.findByIdAndDelete(id);

      res
        .status(200)
        .json({ deletedProfessor, msg: "Usuário excluido com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },
  update: async (req, res) => {
    try {
      const id = req.query.id;
      const {
        nome,
        email,
        senha,
        cpf,
        rg,
        curso,
        departamento,
        instituicaoEnsino,
      } = req.body;

      const pessoa = {
        nome,
        email,
        senha,
      };
      const professor = {
        cpf,
        rg,
        curso,
        departamento,
        instituicaoEnsino,
      };

      const updatedProfessor = await ProfessorModel.findByIdAndUpdate(
        id,
        professor,
        { new: true }
      );

      const updatePessoaProfessor = await PessoaModel.findByIdAndUpdate(
        updatedProfessor.pessoa._id,
        pessoa,
        { new: true }
      );

      if (!updatedProfessor || !updatePessoaProfessor) {
        res.status(404).json({ msg: "Usuário não encontrado!" });
        return;
      }

      let response = await updatedProfessor.populate({
        path: "pessoa",
        populate: {
          path: "carteira",
          populate: {
            path: "operacao.origem operacao.destino",
          },
        },
      });
      response = await response.populate("instituicaoEnsino");

      res.status(201).json({
        response,
        msg: "Usuário atualizado com sucesso!",
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = professorController;
