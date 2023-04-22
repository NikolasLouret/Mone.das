const mongoose = require("mongoose")
const { Schema } = mongoose;

const instituicaoEnsinoSchema = new Schema(
    {
        nome: {
            type: String,
            required: true
        },
        endereco:{
            cep:{
                type: Number,
                require: true
            },
            numero:{
                type: Number,
                require: true
            }
        },
        cursos: [{
            type: String,
            required: true
        }]
    },
    { timestemps: true }
)

const InstituicaoEnsino = mongoose.model("InstituicaoEnsino", instituicaoEnsinoSchema)

module.exports = {
    InstituicaoEnsino,
    instituicaoEnsinoSchema
}