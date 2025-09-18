// index.js (do seu backend Node.js)

require('dotenv').config();

const express = require('express');
const cors = require('cors'); // <<< Importa o pacote cors
const app = express();
const PORT = process.env.PORT || 3000;

const userRoutes = require('./routes/userRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// --- NOVO: Configuração do CORS ---
// Em desenvolvimento, permitir qualquer origem pode ser ok (para localhost).
// Em produção, você deve restringir a origens específicas (ex: 'https://seusite.com').
app.use(cors({
  origin: 'https://sistema-autenticacao-frontend.vercel.app', // Permite requisições APENAS do seu frontend Angular
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
  credentials: true, // Permite o envio de cookies de sessão, cabeçalhos de autorização, etc.
  optionsSuccessStatus: 204 // Retorna 204 para OPTIONS (preflight) com sucesso
}));
// Se quiser ser menos restritivo (MAS CUIDADO EM PRODUÇÃO):
// app.use(cors()); // Permite todas as origens (default)

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('API de Autenticação Funcionando!');
});

app.use('/api/auth', userRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});