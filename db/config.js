
const mongoose = require('mongoose');

const conexion = async () => {

    try {

        await mongoose.connect(process.env.DB_CONNECTION);
        console.log('conexión exitosa');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar con la db');
    }
}

module.exports = {
    conexion
}