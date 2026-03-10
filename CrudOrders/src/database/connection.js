const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "ordersdb",
    password: process.env.DB_PASSWORD || "postgres",
    port: parseInt(process.env.DB_PORT || "5432", 10)
});

/**
 * Executa uma query simples.
 * @param {string} text - SQL text
 * @param {Array} [params] - parâmetros da query
 * @returns {Promise<object>} resultado da query
 */
function query(text, params) {
  return pool.query(text, params);
}

/**
 * Obtém um client do pool para transações manuais.
 * Lembre-se de liberar o client com `release()` quando terminar.
 * @returns {Promise<import('pg').PoolClient>}
 */
function getClient() {
  return pool.connect();
}

/**
 * Encerra o pool de conexões.
 * @returns {Promise<void>}
 */
function close() {
  return pool.end();
}

module.exports = {
  query,
  getClient,
  close,
  // Exportando o pool para casos avançados (opcional)
  pool,
};