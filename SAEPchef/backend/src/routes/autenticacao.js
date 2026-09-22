import express from 'express';
import { pool } from '../db.js';;

const router = express.Router();

// Quem está na tela agora? O logado, ou o @SAEPChef institucional.
router.get('/sessao', async (req, res) => {
    if (req.session.usuario) {
        return res.json({ logado: true, usuario: req.session.usuario });
    }
    const { rows } = await pool.query(
        `SELECT nome_usuario, imagem_usuario, tipo FROM usuario WHERE nome_usuario = $1`, 
        ['SAEPChef']
    );
    res.json({ logado: false, usuario: rows[0] });
});

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    const { rows } = await pool.query(
        `SELECT id_usuario, nome, nome_usuario, imagem_usuario, tipo
         FROM usuario
         WHERE email = $1 AND senha = $2`,
        [email, senha]
    );
    if (rows.length === 0) {
        return res.status(401).json({ erro: 'Usuário não encontrado ou senha incorreta' });
    }
    req.session.usuario = rows[0]; // guarda na sessão
    res.json({ usuario: rows[0] });
});

router.post('/logout', (req, res) => {
    req.session.destroy(() => res.json({ ok: true }));
});

router.get('/perfil', async (req, res) => {
    if (!req.session.usuario) return res.status(401).json({ erro: 'não autenticado' });
    const id = req.session.usuario.id_usuario;
    const { rows } = await pool.query(`
        SELECT
        (SELECT COUNT(*) FROM receita WHERE id_usuario = $1) AS receitas,
        (SELECT COUNT(*)
         FROM favorito f
         JOIN receita r ON r.id_receita = f.id_receita
         WHERE r.id_usuario = $1) AS favoritos
    `, [id]);
    res.json(rows[0]);
});

export default router;
