const mongoose = require("mongoose")
const { Schema } = mongoose;

const professorSchema = new Schema(
    {
        pessoa: {
            type: Schema.Types.ObjectId,
            ref: 'Pessoa'
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
        }
    },
    { timestemps: true }
)

const Professor = mongoose.model("Professor", professorSchema)

module.exports = {
    Professor,
    professorSchema
}