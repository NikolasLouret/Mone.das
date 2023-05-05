const mongoose = require("mongoose")
const { Schema } = mongoose;

const carteiraSchema = new Schema(
    {
        saldo: {
            type: Number,
            required: true
        },
        operacao: [{
            descricao:{
                type: String,
                required: true
            },
            origem:{
                type: Schema.Types.ObjectId,
                required: true
            },
            destino:{
                type: Schema.Types.ObjectId,
                required: true
            },
            valor:{
                type: Number,
                required: true
            },
            data: {
                type: String,
                require: true
            }
        }]
        
    },
    { timestemps: true }
)

const Carteira = mongoose.model("Carteira", carteiraSchema)

module.exports = {
    Carteira,
    carteiraSchema
}