const mssql = require('mssql');

const config = {
    user: 'sa', 
    password: 'postgres', 
    server: '127.0.0.1',
    database: 'gestorcitas',
    port: 1433,
    options: {
        trustServerCertificate: true,
        trustedConnection: true
    }
};

module.exports = {
    query: async (text, params = []) => {
        try {
            const pool = await mssql.connect(config);
            const request = pool.request();
            
            if (params.length > 0) {
                params.forEach((param, index) => {
                    const paramName = `p${index + 1}`; // Usar un prefijo como p1, p2
                    request.input(paramName, param);
                   
                    // Reemplazar todas las apariciones de $1, $2, etc., usando una expresión regular global
                    const regex = new RegExp(`\\$${index + 1}`, 'g');
                    text = text.replace(regex, `@${paramName}`);
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