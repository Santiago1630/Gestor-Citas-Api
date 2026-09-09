const express = require('express');
const router = express.Router();
const negocioService = require('../repositories/NegocioRepository');

// 1. POST - Crear Negocio
router.post('/negocios', async (req, res) => {
    try {
        const negocio = req.body;
        await negocioService.crearNegocio(negocio);
        res.status(201).json(negocio);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. GET - Obtener todos o por ID (?idNegocio=2)
router.get('/negocios', async (req, res) => {
    try {
        const idNegocio = req.query.idNegocio;

        if (!idNegocio) {
            const negocios = await negocioService.obtenerNegocios();
            return res.status(200).json(negocios);
        } else {
            const negocio = await negocioService.obtenerNegocioPorId(parseInt(idNegocio));
            return res.status(200).json(negocio);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. PUT - Actualizar Negocio
router.put('/negocios', async (req, res) => {
    try {
        const idNegocio = parseInt(req.query.idNegocio);
        const negocio = req.body;
        negocio.idNegocio = idNegocio;

        await negocioService.actualizarNegocio(negocio);
        res.status(200).json(negocio);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. DELETE - Eliminar Negocio
router.delete('/negocios', async (req, res) => {
    try {
        const idNegocio = parseInt(req.query.idNegocio);
        await negocioService.eliminarNegocio(idNegocio);
        res.status(200).json("Negocio eliminado");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
