const mongoose = require("mongoose")
const { Schema } = mongoose;

const empresaSchema = new Schema(
    {
        pessoa: {
            type: Schema.Types.ObjectId,
            ref: 'Pessoa'
        },
        vantagens:[{
            type: Schema.Types.ObjectId,
            ref: "Vantagem"
        }],
        
    },
    { timestemps: true }
)

const Empresa = mongoose.model("Empresa", empresaSchema)

module.exports = {
    Empresa,
    empresaSchema
}