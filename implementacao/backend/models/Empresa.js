const mongoose = require("mongoose")
const { Schema } = mongoose;

const empresaSchema = new Schema(
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
        vantagens:[{
            type: Schema.Types.ObjectId,
            ref: "Vantagem"
        }],
        carteira: {
            type: Schema.Types.ObjectId,
            ref: 'Carteira'
        }
    },
    { timestemps: true }
)

const Empresa = mongoose.model("Empresa", empresaSchema)

module.exports = {
    Empresa,
    empresaSchema
}