// config/db.js

const { Pool } = require('pg'); // Importa a classe Pool do pacote pg

// Cria uma nova instância de Pool usando as variáveis de ambiente
const pool = new Pool({
    user: process.env.DB_USER,  
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Adiciona um listener para erros na conexão com o banco de dados
pool.on('error', (err, client) => {
    console.error('Erro inesperado no cliente ocioso', err);
    process.exit(-1); // Encerra o processo se houver um erro crítico
});

// Exporta o pool para que possa ser usado em outras partes da aplicação
module.exports = {
    query: (text, params) => pool.query(text, params), // Método para executar queries
    // Você pode adicionar outros métodos para transações, etc., futuramente
};