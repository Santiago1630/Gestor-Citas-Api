const express = require('express');
const app = express();
const PORT = 8080; 

app.use(express.json());

const citaRoutes = require('./routes/CitaRoutes');
const negocioRoutes = require('./routes/NegocioRoutes');

app.use('/api', citaRoutes);
app.use('/api', negocioRoutes);

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
