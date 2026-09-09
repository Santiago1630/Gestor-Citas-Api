const express = require('express');
const router = express.Router();
// Se llama directamente al servicio o repositorio más adelante
const citaService = require('../repositories/citaRepository'); 

// 1. POST - Crear Cita
router.post('/citas', async (req, res) => {
    try {
        const cita = req.body; // JavaScript ya lo transforma automáticamente a objeto
        await citaService.crearCita(cita);
        res.status(201).json(cita);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. GET - Obitene r todas las citas o por ID (?idCita=2)
router.get('/citas', async (req, res) => {
    try {
        const idCita = req.query.idCita; // Captura automáticamente el valor después del '='

        if (!idCita) {
            const citas = await citaService.obtenerCitas();
            return res.status(200).json(citas);
        } else {
            const cita = await citaService.obtenerCitaPorId(parseInt(idCita));
            return res.status(200).json(cita);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. PUT - Actualizar Cita
router.put('/citas', async (req, res) => {
    try {
        const idCita = parseInt(req.query.idCita);
        const cita = req.body;
        cita.idCita = idCita;

        await citaService.actualizarCita(cita);
        res.status(200).json(cita);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. DELETE - Eliminar Cita
router.delete('/citas', async (req, res) => {
    try {
        const idCita = parseInt(req.query.idCita);
        await citaService.eliminarCita(idCita);
        res.status(200).json("Cita eliminada");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
