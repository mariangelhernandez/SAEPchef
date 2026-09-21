import {query} from "../config/db.js"

export const chefRepository = {
    async findAll(){
        const res = await query("SELECT * FROM tb_receita ORDER BY id;");
        return res.rows;
    },

    async create(tb_receita){
        const { id_receita,
            titulo_receita,
            origem_receita,
            id_usuario,
            url_imagem,
            created_at,
            updated_at
         } = tb_receita;
        
        const sql = 'INSERT INTO tb_receita (usuario_id, titulo_receita, origem_receita, id_usuario, create_at, update_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;';
        const res = await query(sql, [usuario_id, titulo_receita, origem_receita, id_usuario, create_at, update_at]);
        return res.rows[0]
    },

    async delete(id){
        const res = await query('DELETE * FROM tb_receita where id = $1;',[id]);
        return res.rows[0]
    },

//     async update(id, tb_receita){
//         const usuario_id, titulo_receita, origem_receita, id_usuario, create_at, update_at} = tb_receita;
//         const sql = 'UPDATE tb_ receitas SET usuario_id = $1, titulo_receita = $2, origem_receita = $3, id_usuario = $4, create_at = $5, update_at = $6 WHERE id = $7 RETURNING *;'
//         const res = await query(sql, [usuario_id, titulo_receita, origem_receita, id_usuario, create_at, update_at, id]);
//         return res.rows[0]
//     }
}