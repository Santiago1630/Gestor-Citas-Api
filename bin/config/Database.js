const { Pool } = require('pg');

// Configuramos los datos de acceso a PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'gestorcitas',
    password: 'Santiago2006',
    port: 5432, // Puerto por defecto de PostgreSQL
});

// Exportamos el pool para que los Repositorios puedan hacer consultas SQL
module.exports = {
    query: (text, params) => pool.query(text, params),
    pool // Por si necesitas cerrar la conexión general más adelante
};
