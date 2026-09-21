const express = require('express');
const router = express.Router();

const citaService = require('../repositories/CitaRepository'); 

router.post('/citas', async (req, res) => {
    try {
        const cita = req.body; 
        await citaService.crearCita(cita);
        res.status(201).json(cita);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/citas', async (req, res) => {
    try {
        const { idCita, telefono } = req.query; 

        if (idCita) {
            const cita = await citaService.obtenerCitaPorId(parseInt(idCita));
            return res.status(200).json(cita);
        } else if (telefono) {
            const citas = await citaService.obtenerCitasPorTelefono(telefono);
            return res.status(200).json(citas);
        } else {
            const citas = await citaService.obtenerCitas();
            return res.status(200).json(citas);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

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
