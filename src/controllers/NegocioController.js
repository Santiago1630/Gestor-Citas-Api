const express = require('express');
const router = express.Router();
const negocioService = require('../repositories/NegocioRepository');

router.post('/negocios', async (req, res) => {
    try {
        const negocio = req.body;
        await negocioService.crearNegocio(negocio);
        res.status(201).json(negocio);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

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
