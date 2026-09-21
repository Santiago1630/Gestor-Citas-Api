const express = require('express');
const router = express.Router();
const usuarioRepository = require('../repositories/UsuarioRepository');

// Crear cuenta de dueño
router.post('/registro', async (req, res) => {
    try {
        const { nombre, correo, contrasena } = req.body;

        if (!nombre || !correo || !contrasena) {
            return res.status(400).json({
                error: 'Nombre, correo y contraseña son obligatorios'
            });
        }

        const existe = await usuarioRepository.buscarPorCorreo(correo);

        if (existe) {
            return res.status(400).json({
                error: 'El correo ya está registrado'
            });
        }

        const nuevoUsuario = {
            nombre: nombre.trim(),
            correo: correo.trim().toLowerCase(),
            contrasena,
            rol: 'administrador'
        };

        const usuarioCreado = await usuarioRepository.crearUsuario(nuevoUsuario);

        res.status(201).json({
            mensaje: 'Cuenta creada con éxito. Ahora puedes iniciar sesión.',
            usuario: usuarioCreado
        });
    } catch (error) {
        console.error('Error en /registro:', error);
        res.status(500).json({ error: error.message });
    }
});

// Iniciar sesión
router.post('/login', async (req, res) => {
    try {
        const { correo, contrasena } = req.body;

        if (!correo || !contrasena) {
            return res.status(400).json({
                error: 'Correo y contraseña son obligatorios'
            });
        }

        const usuario = await usuarioRepository.buscarPorCorreo(correo.trim().toLowerCase());

        if (!usuario || usuario.contrasena !== contrasena) {
            return res.status(401).json({
                error: 'Correo o contraseña incorrectos'
            });
        }

        res.status(200).json({
            mensaje: 'Inicio de sesión correcto',
            idUsuario: usuario.id_usuario,
            nombre: usuario.nombre,
            correo: usuario.correo,
            rol: usuario.rol
        });
    } catch (error) {
        console.error('Error en /login:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
