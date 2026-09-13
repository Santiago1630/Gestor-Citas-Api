const mssql = require('mssql');

const config = {
    user: 'sa', 
    password: 'postgres', 
    server: '127.0.0.1',
    database: 'gestorcitas',
    port: 1433,
    options: {
        trustServerCertificate: true,
        trustedConnection: true // 
    }
};


module.exports = {
    query: async (text, params = []) => {
        try {
            const pool = await mssql.connect(config);
            const request = pool.request();
            
            if (params.length > 0) {
                params.forEach((param, index) => {
                    request.input((index + 1).toString(), param);
                    // Se reemplaza $1 por @1, $2 por @2,etc.
                    text = text.replace(`$${index + 1}`, `@${index + 1}`);
                });
            }
            
            const result = await request.query(text);
            return { rows: result.recordset }; 
        } catch (error) {
            console.error("Error en la consulta SQL:", error);
            throw error;
        }
    }
};
