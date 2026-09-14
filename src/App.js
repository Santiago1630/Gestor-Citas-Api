const express = require('express');
const app = express();
const PORT = 8080; 

app.use(express.json());

const citaRoutes = require('./controllers/CitaController');
const negocioRoutes = require('./controllers/NegocioController');

app.use('/api', citaRoutes);
app.use('/api', negocioRoutes);

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
