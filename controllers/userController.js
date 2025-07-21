// controllers/userController.js

const bcrypt = require('bcryptjs'); // Importa o bcrypt para hash de senhas
const db = require('../config/db'); // Importa o módulo de conexão com o banco de dados

// Função para registrar um novo usuário
exports.registerUser = async (req, res) => {
    const { username, password } = req.body; // Pega username e password do corpo da requisição

    if (!username || !password) {
        return res.status(400).json({ message: 'Nome de usuário e senha são obrigatórios.' });
    }

    try {
        // Verifica se o usuário já existe
        const userExists = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userExists.rows.length > 0) {
            return res.status(409).json({ message: 'Nome de usuário já existe.' }); // 409 Conflict
        }

        // Gera o hash da senha
        const salt = await bcrypt.genSalt(10); // Gera um "salt" (valor aleatório para aumentar a segurança do hash)
        const password_hash = await bcrypt.hash(password, salt); // Gera o hash da senha

        // Insere o novo usuário no banco de dados
        const newUser = await db.query(
            'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username, created_at',
            [username, password_hash]
        );

        // Responde com sucesso (você pode retornar o usuário criado, mas sem a senha)
        res.status(201).json({
            message: 'Usuário registrado com sucesso!',
            user: {
                id: newUser.rows[0].id,
                username: newUser.rows[0].username,
                created_at: newUser.rows[0].created_at,
            }
        });

    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};