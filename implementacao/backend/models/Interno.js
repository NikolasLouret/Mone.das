const mongoose = require("mongoose")
const { Schema } = mongoose;


const InternoSchema = new Schema({
    incrementeId: {
        type: Number,
        required: true
    }})

    const Interno = mongoose.model("Interno", InternoSchema)

    module.exports = {
        Interno,
        InternoSchema
    }