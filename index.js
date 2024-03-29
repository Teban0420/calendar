
const express = require('express');
const { conexion } = require('./db/config.js');
const cors = require('cors');
require('dotenv').config();

// creo la app de express
const app = express();

// conexion db
conexion();

// CORS 
app.use(cors());


// directorio publico
app.use( express.static('public'));

// lectura y parseo del body
app.use( express.json() );


// rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});