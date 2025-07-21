// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;

    // Verifica se o token está no cabeçalho 'Authorization' e começa com 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extrai o token da string 'Bearer TOKEN_AQUI'
            token = req.headers.authorization.split(' ')[1];

            // Verifica o token usando a chave secreta
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Anexa o ID do usuário decodificado à requisição para uso posterior
            // Isso é útil para saber qual usuário está fazendo a requisição
            req.userId = decoded.id;
            req.username = decoded.username; // Opcional, se quiser o username também

            next(); // Continua para a próxima função middleware ou rota
        } catch (error) {
            // Se o token for inválido ou expirado
            console.error('Erro de token:', error.message);
            return res.status(401).json({ message: 'Não autorizado, token falhou.' });
        }
    }

    // Se nenhum token for fornecido
    if (!token) {
        return res.status(401).json({ message: 'Não autorizado, nenhum token.' });
    }
};

module.exports = { protect };