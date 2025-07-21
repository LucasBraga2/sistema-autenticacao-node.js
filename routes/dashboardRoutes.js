// routes/dashboardRoutes.js

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Importa o middleware de proteção

// Rota protegida de exemplo para o dashboard
// GET /api/dashboard
router.get('/', protect, (req, res) => {
    // req.userId e req.username vêm do middleware 'protect'
    res.status(200).json({
        message: `Bem-vindo à dashboard protegida, ${req.username}!`,
        userId: req.userId,
        data: 'Este é um dado sensível que só usuários logados podem ver.',
    });
});

module.exports = router;