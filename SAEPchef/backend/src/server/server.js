import express from 'express';
import session from 'express-session';
import autenticacao from '../routes/autenticacao.js';
import receitas from '../routes/receitas.js';
import favoritos from '../routes/favoritos.js';
import dotenv from "dotenv";

dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000;
// Lê JSON enviado pelo fetch do navegador
app.use(express.json());
// Guarda quem está logado
app.use(session({
    secret: 'saepchef',
    resave: false,
    saveUninitialized: false
}));
// Serve index.html, css, js, imagens e svgs:
app.use(express.static('./SAEPchef/frontend'));

app.use('/api', autenticacao);
app.use('/api', receitas);
app.use('/api', favoritos);

app.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
