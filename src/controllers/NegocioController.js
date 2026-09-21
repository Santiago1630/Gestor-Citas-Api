const express = require('express');
const router = express.Router();
const negocioService = require('../repositories/NegocioRepository');

// Crear negocio para un dueño
router.post('/negocios', async (req, res) => {
    try {
        const negocio = req.body;

        await negocioService.crearNegocio(negocio);

        res.status(201).json({
            mensaje: 'Negocio creado con éxito',
            negocio
        });
    } catch (error) {
        console.error('Error creando negocio:', error);
        res.status(500).json({ error: error.message });
    }
});

// GET público: usado por los clientes para escoger un negocio.
router.get('/negocios', async (req, res) => {
    try {
        const { idNegocio, idUsuario } = req.query;

        if (idNegocio) {
            const negocio = await negocioService.obtenerNegocioPorId(parseInt(idNegocio));

            if (!negocio) {
                return res.status(404).json({ error: 'Negocio no encontrado' });
            }

            return res.status(200).json(negocio);
        }

        if (idUsuario) {
            const negocios = await negocioService.obtenerNegociosPorUsuario(parseInt(idUsuario));
            return res.status(200).json(negocios);
        }

        const negocios = await negocioService.obtenerNegocios();
        return res.status(200).json(negocios);
    } catch (error) {
        console.error('Error obteniendo negocios:', error);
        res.status(500).json({ error: error.message });
    }
});

// Actualizar solamente si el negocio pertenece al dueño.
router.put('/negocios', async (req, res) => {
    try {
        const idNegocio = parseInt(req.query.idNegocio);
        const negocio = req.body;

        negocio.idNegocio = idNegocio;

        await negocioService.actualizarNegocio(negocio);

        res.status(200).json({
            mensaje: 'Negocio actualizado correctamente',
            negocio
        });
    } catch (error) {
        console.error('Error actualizando negocio:', error);
        res.status(500).json({ error: error.message });
    }
});

// Eliminar solamente si el negocio pertenece al dueño.
router.delete('/negocios', async (req, res) => {
    try {
        const idNegocio = parseInt(req.query.idNegocio);
        const idUsuario = parseInt(req.query.idUsuario);

        await negocioService.eliminarNegocio(idNegocio, idUsuario);

        res.status(200).json({ mensaje: 'Negocio eliminado' });
    } catch (error) {
        console.error('Error eliminando negocio:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
