
/**
 * Rutas de usuarios / auth
 * host + /api/auth
 */

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/authController.js');
const { validarCampos } = require('../middlewares/validar-campos.js');
const { validarJWT } = require('../middlewares/validar-jwt.js');


router.post(
    '/new',
     [ // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min:6 }),
        validarCampos
     ], 
     crearUsuario);

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min:6 }),
        validarCampos
    ], 
    loginUsuario );


// tomar jwt actual y obtener uno nuevo para prolongar tiempo de autenticacion
router.get('/renew',validarJWT, revalidarToken);


module.exports = router;