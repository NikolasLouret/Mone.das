const { Empresa: EmpresaModel } = require("../models/Empresa");
const { Pessoa: PessoaModel } = require("../models/Pessoa");
const fetch = require("node-fetch");
const { Vantagem: VantagemModel } = require("../models/Vantagem");
const { response } = require("express");

const EmpresaController = {
  create: async (req, res) => {
    try {
      const { nome, email, senha } = req.body;

      await fetch(`http://localhost:3000/api/pessoa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome,
          senha: senha,
          email: email,
          tipo: "Empresa",
        }),
      })
        .then((resp) => {
          return resp.json();
        })
        .then(async (result) => {
          let pessoa = result.response;
          empresa = {
            pessoa,
            vantagens: [],
          };

          let response = await EmpresaModel.create(empresa);

          res
            .status(201)
            .json({ response, msg: "Empresa cadastrado com sucesso!" });
        });
    } catch (error) {
      console.log(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const empresas = await EmpresaModel.find().populate("pessoa");

      res.status(201).json(empresas);
    } catch (error) {
      console.log(error);
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params.id;
      const empresa = await EmpresaModel.findById(id).populate("pessoa");

      if (!empresa) {
        res.status(404).json({ msg: "Empresa não encontrado!" });
        return;
      }

      res.status(201).json(empresa);
    } catch (error) {
      console.log(error);
    }
  },
  getByEmail: async (req, res) => {
    try {
      const email = req.params.email;
      let empresa = await EmpresaModel.findOne({ email });

      if (!empresa) {
        res.status(404).json({ msg: "Usuário não encontrado!" });
        return;
      }

      empresa = await empresa.populate({
        path: "pessoa",
        populate: {
          path: "carteira",
          populate: {
            path: "operacao.origem operacao.destino",
          },
        },
      });

      res.status(201).json(empresa);
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.query.id;
      const empresa = await EmpresaModel.findById(id);

      if (!empresa) {
        res.status(404).json({ msg: "Empresa não encontrado!" });
        return;
      }

      const deletedEmpresa = await EmpresaModel.findByIdAndDelete(id);

      res
        .status(200)
        .json({ deletedEmpresa, msg: "Empresa excluido com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },
  update: async (req, res) => {
    try {
      const id = req.query.id;
      const { nome, email, senha, vantagens } = req.body;

      let pessoaEmpresaUpdate = {
        nome,
        email,
        senha,
      };
      const empresa = {
        vantagens,
      };

      const updatedEmpresa = await EmpresaModel.findByIdAndUpdate(id, empresa, {
        new: true,
      });
      const updatePessoaEmpresa = await PessoaModel.findByIdAndUpdate(
        updatedEmpresa.pessoa._id,
        pessoaEmpresaUpdate,
        { new: true }
      );
      if (!updatedEmpresa || !updatePessoaEmpresa) {
        res.status(404).json({ msg: "Empresa não encontrado!" });
        return;
      }

      let response = await updatedEmpresa.populate({
        path: "vantagens pessoa",
        populate: {
          path: "carteira",
          populate: {
            path: "operacao.origem operacao.destino",
          },
        },
      });

      res
        .status(200)
        .json({ response, msg: "Empresa atualizado com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },
  addVantagem: async (req, res) => {
    try {
      const { vantagem } = req.body;
      const id = req.params.id;
      const empresa = await EmpresaModel.findById(id);
      let novaVanatgem = (vantagem.empresa = empresa);
      if (!empresa || !empresa) {
        res.status(404).json({ msg: "Empresa não encontrada!" });
        return;
      }
      try {
        novaVanatgem = await VantagemModel.create(vantagem);
      } catch (error) {
        res.status(404).json({ msg: "Verifique se os dados estão corretos!" });
        return;
      }

      empresa.vantagens.push(novaVanatgem._id);

      let response = await EmpresaModel.findByIdAndUpdate(
        id,
        { vantagens: empresa.vantagens },
        { new: true }
      );
      res
        .status(200)
        .json({ response, msg: "Vantagem cadastrada com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = EmpresaController;
