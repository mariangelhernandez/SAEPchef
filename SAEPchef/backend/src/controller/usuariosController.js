import { query } from "../config/db.js";

export const usuarioController = {

    async login(req, res){
        console.log(req.body)
        const{email, senha} = req.body;

        if(!email){
            return res.status(400).json({
                erro: ' E-mail inválido ou vazio.'
            })
        }
        if(!senha){
            return res.status(400).json({
                erro: 'A senha é obrigatória e não pode estar vazia'
            })
        }
        const usuario = await query(
            "SELECT * FROM tb_usuario WHERE email = $1 AND senha = $2;",
            [email, senha]);
        if(usuario){
            res.status(200).json({
                id: usuario.id_usuario,
                nome: usuario.nome,
                nome_usuario: usuario.nome_usuario,
                email: usuario.email,
                senha: usuario.senha,
                imagem_usuario: usuario.imagem_usuario,
                tipo: usuario.tipo
            })  
        }else{
            return res.status(404).json({
                erro:"Usuário não encontrado ou senha incorreta"
            })
        }
    }
}