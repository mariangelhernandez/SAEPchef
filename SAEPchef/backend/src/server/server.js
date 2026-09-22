const express = require('express');
const path = require('path');
const app = express();


const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));


app.get('/', (req, res) => {
    res.send('Servidor SAEPchef rodando com sucesso!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} (http://localhost:${PORT})`);
});