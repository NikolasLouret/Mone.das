const {
  InstituicaoEnsino: InstituicaoEnsinoModel,
} = require("../models/InstituicaoEnsino");

const InstituicaoEnsinoController = {
  create: async (req, res) => {
    const { nome, departamentos, endereco, cursos } = req.body;
    try {
      const instituicaoEnsino = {
        nome,
        endereco,
        departamentos,
        cursos,
      };

      const response = await InstituicaoEnsinoModel.create(instituicaoEnsino);

      res
        .status(201)
        .json({ response, msg: "InstituicaoEnsino cadastrado com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const instituicaoEnsinos = await InstituicaoEnsinoModel.find();

      res.status(201).json(instituicaoEnsinos);
    } catch (error) {
      console.log(error);
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params.id;
      const instituicaoEnsino = await InstituicaoEnsinoModel.findById(id);

      if (!instituicaoEnsino) {
        res.status(404).json({ msg: "InstituicaoEnsino não encontrado!" });
        return;
      }

      res.status(201).json(instituicaoEnsino);
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.query.id;
      const instituicaoEnsino = await InstituicaoEnsinoModel.findById(id);

      if (!instituicaoEnsino) {
        res.status(404).json({ msg: "InstituicaoEnsino não encontrado!" });
        return;
      }

      const deletedInstituicaoEnsino =
        await InstituicaoEnsinoModel.findByIdAndDelete(id);

      res.status(200).json({
        deletedInstituicaoEnsino,
        msg: "InstituicaoEnsino excluido com sucesso!",
      });
    } catch (error) {
      console.log(error);
    }
  },
  update: async (req, res) => {
    try {
      const id = req.query.id;
      const { nome, endereco, departamentos, cursos } = req.body;

      const InstituicaoEnsino = {
        nome,
        endereco,
        departamentos,
        cursos,
      };

      const updatedInstituicaoEnsino =
        await InstituicaoEnsinoModel.findByIdAndUpdate(id, InstituicaoEnsino);

      if (!updatedInstituicaoEnsino) {
        res.status(404).json({ msg: "InstituicaoEnsino não encontrado!" });
        return;
      }

      res
        .status(200)
        .json({ aluno, msg: "InstituicaoEnsino atualizado com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = InstituicaoEnsinoController;
