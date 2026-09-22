import express from 'express';
import { pool } from '../db.js';
const router = express.Router();
router.post('/favoritos', async (req, res) => {
    if (!req.session.usuario) {
        return res.status(401).json({ erro: 'nao_autenticado' });
    }
    const idUsuario = req.session.usuario.id_usuario;
    const idReceita = req.body.id_receita;
    // Já existe? Então este clique é para REMOVER.
    const existe = await pool.query(
        'SELECT 1 FROM favorito WHERE id_usuario = $1 AND id_receita = $2',
        [idUsuario, idReceita]
    );
    if (existe.rowCount > 0) {
        await pool.query(
            'DELETE FROM favorito WHERE id_usuario = $1 AND id_receita = $2',
            [idUsuario, idReceita]
        );
    } else {
        await pool.query(
            'INSERT INTO favorito (id_usuario, id_receita) VALUES ($1, $2)',
            [idUsuario, idReceita]
        );
    }
    // Devolve o número verdadeiro, contado agora
    const total = await pool.query(
        'SELECT COUNT(*) AS favoritos FROM favorito WHERE id_receita = $1',
        [idReceita]
    );
    res.json({
        favoritado: existe.rowCount === 0,
        favoritos: Number(total.rows[0].favoritos)
    });
});
export default router;