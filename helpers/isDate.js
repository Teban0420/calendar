/**
 * funcion para validar fechas al recibir datos del 
 * formulario
 */
const moment = require('moment');

const isDate = ( value) => {

    if(!value){
        return false;
    }

    const fecha = moment(value);

    // valido la fecha con moment
    if(fecha.isValid()){
        return true;
    }
    else{
        return false;
    }
}

module.exports = { isDate };