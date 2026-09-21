import {chefRepository} from "../repositories/chefRepository.js"

export const chefService = {
    async getAllAnimais(){
        return await chefRepository.findAll();
    },

    async createChef(ChefRequisicao){
        if(chefRequisicao.idade<0){
            throw new Error()
        }
        return await chefRepositoryRepository.create(chefRequisicao);
    },

    async updateChef(id, chefRequisicao){
        const chefExistente = await chefRepository.findById(id);
        if(!chefExistente){
            throw new Error(" não encontrada");
        }
        return await chefRepository.update(id, chefRequisicao)
    }
}