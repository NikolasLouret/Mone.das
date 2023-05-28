const mongoose = require("mongoose");
const { Schema } = mongoose;

const PessoaSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  carteira: {
    type: Schema.Types.ObjectId,
    ref: "Carteira",
  },
});

const Pessoa = mongoose.model("Pessoa", PessoaSchema);

module.exports = {
  Pessoa,
  PessoaSchema,
};
