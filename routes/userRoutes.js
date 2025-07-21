// routes/userRoutes.js

const express = require('express');
const router = express.Router(); // Cria uma instância de um "router" do Express
const userController = require('../controllers/userController'); // Importa o controlador

// Rota para registro de usuário
// POST /api/auth/register
router.post('/register', userController.registerUser);

module.exports = router; // Exporta o router para ser usado em index.js