import {chefService} from "../services/chefService.js"

export const chefController = {
    async getAll(req, res){
        try{ 
            const chefService = await chefService.getAllchef();
            res.json(chef);
        }catch(error){
            res.status(404).json({erro: error.message})
        }
    },

      async get(req, res){
        try{
            const novoChef = await chefService.getChef(req.body);
            res.status(201).json(chef);
        }catch(error){
            res.status(400).json({erro: error.message});
        }
    },

  async delete(req, res){
        try{
            await chefService.chef(req.params.id);
            res.status(204).send();
        }catch(error){
            const status = error.message === "chef nao encontrado" ? 404 : 400;
            res.status(status).json({erro: error.message});
        }}, 

    async create(req, res){
        try{
            const novoChef = await chefServiceService.createChef(req.body);
            res.status(201).json(novoChef);
        }catch(error){
            res.status(400).json({erro: error.message});
        }
    },

    async update(req, res){
        try{
            const cheflAtualizado = await chefService.updateChef(
                req.params.id, req.body)
            res.json(chefAtualizado)
        }catch(error){
            const status = error.message === "chef não encontrado" ? 404 : 400;
            res.status(status).json({erro: error.message});
        }
    }


}