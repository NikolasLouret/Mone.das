const mongoose = require("mongoose")
const { Schema } = mongoose;

const alunoSchema = new Schema(
    {
        pessoa: {
            type: Schema.Types.ObjectId,
            ref: 'Pessoa'
        },
        cpf: {
            type: String,
            require: true
        },
        rg: {
            type: String,
            require: true,
        },
        instituicaoEnsino: {
            type: Schema.Types.ObjectId,
            ref: 'InstituicaoEnsino'
        },
        curso: {
            type: String,
            require: true
        },
        endereco: {
            type: String,
            require: true
        }
    },
    { timestemps: true }
)

const Aluno = mongoose.model("Aluno", alunoSchema)

module.exports = {
    Aluno,
    alunoSchema
}