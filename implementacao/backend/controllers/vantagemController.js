const { Vantagem: VantagemModel } = require("../models/Vantagem");
const EmpresaController = require("./empresaController");


const VantagemController = {
  create: async (req, res) => {
      const { nome, descricao, preco, empresa } = req.body;
      const foto = req.files && req.files.foto; 
    
      if (!foto) {
        return res.status(400).json({ error: "Nenhuma imagem encontrada" });
      }
    
      try {
        
        const fileName = `foto_${Date.now()}_${foto.name}`;

        const vantagem = {
          nome,
          descricao,
          preco,
          empresa,
          foto: fileName, 
        };
    
        foto.mv(`./files/${fileName}`, (error) => {
          if (error) {
            return res.status(500).json({ error: "Erro ao salvar a imagem" });
          }
        });

        const response = await VantagemModel.create(vantagem);

      } catch (error) {
        res.status(500).json({ error: "Erro ao cadastrar a vantagem" });
      }
    },
    getAll: async (req, res) => {
        try {
            const vantagens = await VantagemModel
                .find({})
                .populate({
                    path: 'empresa',
                    select: 'pessoa',
                    populate: { path: 'pessoa', select: 'nome' }
                })

            res.status(201).json(vantagens)
        } catch (error) {
            console.log(error)
        }
    },
    get: async (req, res)=> {
        try {
            const id = req.params.id
            const vantagem = await VantagemModel.findById(id)

            if(!vantagem) {
                res.status(404).json({ msg: "Vantagem não encontrado!" })
                return
            }

            res.status(201).json(vantagem)
        } catch (error) {
            console.log(error)
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.query.id
            const vantagem = await VantagemModel.findById(id)

            if(!vantagem) {
                res.status(404).json({ msg: "Vanatagem não encontrado!" })
                return
            }

            const deletedVantagem = await VantagemModel.findByIdAndDelete(id)

            res.status(200).json({ deletedVantagem, msg: "Vantagem excluido com sucesso!" })
        } catch (error) {
            console.log(error)
        }
    },
    update: async (req, res) => {
        try {
            const id = req.query.id
            const {nome, descricao, preco, foto} = req.body
            
            const vantagem = {
                nome, 
                descricao, 
                preco,
                foto   
                }

            const updatedVantagem = await VantagemModel.findByIdAndUpdate(id, vantagem)

            if(!updatedVantagem) {
                res.status(404).json({ msg: "Vantagem não encontrado!" })
                return
            }

            res.status(200).json({ aluno, msg: "Vantagem atualizado com sucesso!" })

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = VantagemController