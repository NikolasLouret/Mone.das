const { Interno: InternoModel } = require("../models/Interno")

const internoController ={
    create: async (req, res) => {
        try {
            const interno = {
                incrementeId: 0
            }
            const response = await InternoModel.create(interno)
            res.status(201).json({ response, msg: "Interno cadastrado com sucesso!" })
        } catch (error) {
            console.log(error)
        }
    },
    incrementeId: async (req, res) => {
        try {

            const instancia = await InternoModel.findById("64722a31b99540f2109a28dd")
            let soma = instancia.incrementeId + 1
            const interno = {
                incrementeId: soma
            }
            console.log(interno)
            const response = await InternoModel.findByIdAndUpdate(instancia._id,interno)
            
        } catch (error) {
            console.log(error)
        }
    },
    getId: async (req, res) => {
        try {
            const response = await InternoModel.findById("64722a31b99540f2109a28dd")
            if (response) {
                return response
            } else {
                
            }
        } catch (error) {
            console.log(error)
        }
    },
}

module.exports = internoController