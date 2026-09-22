import express from 'express';
import { pool } from '../db.js';
const router = express.Router();
router.get('/receitas', async (req, res) => {
    const idLogado = req.session.usuario ? req.session.usuario.id_usuario : 0;
    const chef = req.query.chef || null;
    const { rows } = await pool.query(`
SELECT r.id_receita,
r.titulo,
r.origem,
r.imagem,
u.nome_usuario AS chef,
COUNT(f.id_favorito) AS favoritos,
BOOL_OR(f.id_usuario = $1) AS favoritado
FROM receita r
JOIN usuario u ON u.id_usuario = r.id_usuario
LEFT JOIN favorito f ON f.id_receita = r.id_receita
WHERE ($2::text IS NULL OR u.nome_usuario = $2)
GROUP BY r.id_receita, u.nome_usuario
ORDER BY r.id_receita
`, [idLogado, chef]);
    res.json(rows);
});
export default router;

router.get('/minhas-receitas', async (req, res) => {
    if (!req.session.usuario) return res.status(401).json({ erro: 'nao_autenticado' });
    const { rows } = await pool.query(
        'SELECT id_receita, titulo FROM receita WHERE id_usuario = $1 ORDER BY id_receita',
        [req.session.usuario.id_usuario]
    );
    res.json(rows);
});

router.delete('/receitas/:id', async (req, res) => {
    if (!req.session.usuario) return res.status(401).json({ erro: 'nao_autenticado' });
    // o id_usuario na condição impede apagar receita de outro chef
    await pool.query(
        'DELETE FROM receita WHERE id_receita = $1 AND id_usuario = $2',
        [req.params.id, req.session.usuario.id_usuario]
    );
    res.json({ ok: true });
});
