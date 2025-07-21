// index.js

require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const userRoutes = require('./routes/userRoutes'); // Importa as rotas de usuário

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('API de Autenticação Funcionando!');
});

// --- Usar as Rotas da API ---
// Todas as rotas definidas em userRoutes.js terão o prefixo '/api/auth'
app.use('/api/auth', userRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});