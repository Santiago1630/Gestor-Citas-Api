const db = require('../config/database');
const negocioRepository = require('./NegocioRepository');

const citaRepository = {
    
    async crearCita(cita) {
        if (!cita.nombreCliente || !cita.nombreCliente.trim()) throw new Error("El nombre del cliente es obligatorio");
        if (!cita.telefono || !cita.telefono.trim()) throw new Error("El telefono es obligatorio");
        if (!cita.tipoServicio || !cita.tipoServicio.trim()) throw new Error("El tipo de servicio es obligatorio");
        if (!cita.fecha || !cita.fecha.trim()) throw new Error("La fecha es obligatoria");
        if (!cita.hora || !cita.hora.trim()) throw new Error("La hora es obligatoria");
        if (!cita.idNegocio) throw new Error("Debe seleccionar un negocio");

        const negocioExiste = await negocioRepository.obtenerNegocioPorId(cita.idNegocio);
        if (!negocioExiste) throw new Error("El negocio no existe");

        cita.estado = "Pendiente";

        const sql = `INSERT INTO citas(nombre_cliente, telefono, tipo_servicio, estado, fecha, hora, id_negocio) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
        const params = [cita.nombreCliente, cita.telefono, cita.tipoServicio, cita.estado, cita.fecha, cita.hora, cita.idNegocio];
        await db.query(sql, params);
    },

    async obtenerCitas() {
        const sql = "SELECT * FROM citas ORDER BY id_cita ASC";
        const resultado = await db.query(sql);
        return resultado.rows;
    },

  async obtenerCitaPorId(idCita) {
        const sql = "SELECT * FROM citas WHERE id_cita = $1";
        const resultado = await db.query(sql, [idCita]);
        
        if (resultado.rows.length === 0) {
            throw new Error("No existe la cita");
        }
        return resultado.rows[0]; // <-- Cambiado de resultado.rows a resultado.rows[0]
    },

    async obtenerCitasPorNegocio(idNegocio) {
        const sql = "SELECT * FROM citas WHERE id_negocio = $1";
        const resultado = await db.query(sql, [idNegocio]);
        return resultado.rows;
    },

    async obtenerCitasPorTelefono(telefono) {
        const sql = "SELECT * FROM citas WHERE telefono = $1";
        const resultado = await db.query(sql, [telefono]);
        return resultado.rows;
    },

    async actualizarCita(cita) {
        await this.obtenerCitaPorId(cita.idCita);

        const sql = `UPDATE citas SET nombre_cliente=$1, telefono=$2, tipo_servicio=$3, estado=$4, fecha=$5, hora=$6, id_negocio=$7 WHERE id_cita=$8`;
        const params = [cita.nombreCliente, cita.telefono, cita.tipoServicio, cita.estado, cita.fecha, cita.hora, cita.idNegocio, cita.idCita];
        await db.query(sql, params);
    },

    async eliminarCita(idCita) {
        await this.obtenerCitaPorId(idCita);

        const sql = "DELETE FROM citas WHERE id_cita = $1";
        await db.query(sql, [idCita]);
    }
};

module.exports = citaRepository;
