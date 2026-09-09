const db = require('../config/database');

const negocioRepository = {

    async crearNegocio(negocio) {
        if (!negocio.nombre || !negocio.nombre.trim()) throw new Error("El nombre es obligatorio");
        if (!negocio.tipoNegocio || !negocio.tipoNegocio.trim()) throw new Error("El tipo de negocio es obligatorio");
        if (!negocio.direccion || !negocio.direccion.trim()) throw new Error("La direccion es obligatoria");
        if (!negocio.telefono || !negocio.telefono.trim()) throw new Error("El telefono es obligatorio");
        if (!negocio.cantidadEmpleados || negocio.cantidadEmpleados <= 0) throw new Error("Cantidad de empleados invalida");

        // Usamos los nombres exactos con guiones bajos de tu pgAdmin
        const sql = `INSERT INTO negocio(nombre, tipo_negocio, direccion, telefono, cantidad_empleados) VALUES ($1, $2, $3, $4, $5)`;
        const params = [negocio.nombre, negocio.tipoNegocio, negocio.direccion, negocio.telefono, negocio.cantidadEmpleados];
        await db.query(sql, params);
    },

    async obtenerNegocios() {
        const sql = "SELECT * FROM negocio ORDER BY id_negocio ASC";
        const resultado = await db.query(sql);
        return resultado.rows;
    },

    async obtenerNegocioPorId(idNegocio) {
        const sql = "SELECT * FROM negocio WHERE id_negocio = $1";
        const resultado = await db.query(sql, [idNegocio]);
        
        if (resultado.rows.length === 0) {
            return null; 
        }
        return resultado.rows;
    },

    async actualizarNegocio(negocio) {
        if (!negocio.idNegocio) throw new Error("El id es obligatorio");
        
        const existe = await this.obtenerNegocioPorId(negocio.idNegocio);
        if (!existe) throw new Error("No existe el negocio");

        const sql = `UPDATE negocio SET nombre=$1, tipo_negocio=$2, direccion=$3, telefono=$4, cantidad_empleados=$5 WHERE id_negocio=$6`;
        const params = [negocio.nombre, negocio.tipoNegocio, negocio.direccion, negocio.telefono, negocio.cantidadEmpleados, negocio.idNegocio];
        await db.query(sql, params);
    },

    async eliminarNegocio(idNegocio) {
        const existe = await this.obtenerNegocioPorId(idNegocio);
        if (!existe) throw new Error("No existe el negocio");

        const sql = "DELETE FROM negocio WHERE id_negocio = $1";
        await db.query(sql, [idNegocio]);
    }
};

module.exports = negocioRepository;
