// index.js

require('dotenv').config(); // Carrega as variáveis de ambiente do .env

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());

// Rota de teste simples
app.get('/', (req, res) => {
    res.send('API de Autenticação Funcionando!');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});