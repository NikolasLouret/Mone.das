const mongoose = require("mongoose")
const { Schema } = mongoose;

const professorSchema = new Schema(
    {
        nome: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        senha: {
            type: String,
            required: true
        },
        cpf:{
            type:String,
            require: true
        },
        rg:{
            type: String,
            require: true,
        },
        curso:{
            type: String,
            require: true
        },
        departamento:{
            type: String,
            require: true
        },
        instituicaoEnsino:{
            type: Schema.Types.ObjectId,
            ref: 'InstituicaoEnsino'
        },
        carteira: {
            type: Schema.Types.ObjectId,
            ref: 'Carteira'
        }
    },
    { timestemps: true }
)

const Professor = mongoose.model("Professor", professorSchema)

module.exports = {
    Professor,
    professorSchema
}