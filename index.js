// index.js

require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const userRoutes = require('./routes/userRoutes'); // Importa as rotas de usuário
const dashboardRoutes = require('./routes/dashboardRoutes'); // Importa as rotas do dashboard

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('API de Autenticação Funcionando!');
});

// --- Usar as Rotas da API ---
app.use('/api/auth', userRoutes); // Rotas de autenticação (registro, login)
app.use('/api/dashboard', dashboardRoutes); // Novas rotas protegidas para o dashboard


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});