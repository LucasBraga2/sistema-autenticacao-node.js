// controllers/userController.js

const bcrypt = require('bcryptjs'); // Importa o bcrypt para hash de senhas
const jwt = require('jsonwebtoken'); // Importa o jsonwebtoken
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

}
// Função para fazer login de um usuário
exports.loginUser = async(req, res) =>{
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Nome de usuário e senha são obrigatórios.' });
    }

    try{
        // 1. Procurar o usuário no banco de dados
        const userResult = await db.query('SELECT * FROM users WHERE username = $1', [username]);

        // Se o usuário não for encontrado
        if(userResult.rows.length === 0){
            return res.status(401).json({ message: 'Credenciais inválidas.' }); // 401 Unauthorized
        }

        const user = userResult.rows[0];
        
        // 2. Comparar a senha fornecida com o hash armazenado
        const isMatch = await bcrypt.compare(password, user.password_hash);

        // Se as senhas não corresponderem
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        // 3. Se as credenciais estiverem corretas, gerar um JWT
        // O JWT_SECRET vem do seu arquivo .env
        const token = jwt.sign(
            { id: user.id, username: user.username }, // Payload: informações a serem armazenadas no token
            process.env.JWT_SECRET, // Chave secreta para assinar o token
            { expiresIn: '1h' } // Opções: expira em 1 hora (você pode ajustar isso)
        )

        // 4. Enviar o token e informações do usuário de volta ao cliente
        res.status(200).json({
            message: 'Login realizado com sucesso!',
            token: token,
            user: {
                id: user.id,
                username: user.username,
            }
        });
    }
    catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};