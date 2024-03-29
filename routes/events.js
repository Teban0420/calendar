
/**
 * rutas que requieren validacion de jwt
 * /api/events
 */

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos.js');
const { actualizarEvento, eliminarEvento, getEventos, crearEvento } = require('../controllers/eventsController.js');
const { validarJWT } = require('../middlewares/validar-jwt.js');
const { isDate } = require('../helpers/isDate.js');

// otra forma de validar JWT en todas las rutas
router.use( validarJWT );

router.get('/', getEventos);

router.post('/',
[
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalización es obligatoria').custom(isDate),
], 
crearEvento);

router.put('/:id', actualizarEvento);

router.delete('/:id', eliminarEvento);

module.exports = router;
