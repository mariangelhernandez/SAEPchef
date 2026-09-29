import express from 'express';
import dotenv from 'dotenv';
import usuarioRoute from "../routes/autenticacao.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(usuarioRoute)
app.listen(PORT, () => {
    console.log(`Servidor BACKEND rodando na porta: ${PORT}.`
    )
})

