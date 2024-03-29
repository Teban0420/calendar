const { response } = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario.js');
const { generarJWT } = require('../helpers/jwt.js');

const crearUsuario = async (req, res = response) => {

   const { email, password } = req.body;

   try {

      let usuario = await Usuario.findOne({ email: email });

      if(usuario){
         return res.status(400).json({ok: false, msg: 'El usuario ya existe'});
      }

      usuario = new Usuario( req.body);

      // encriptar contraseña
      const salt = bcrypt.genSaltSync();
      usuario.password = bcrypt.hashSync( password, salt);
      
      await usuario.save();

      // generar JWT
      const token = await generarJWT(usuario._id, usuario.name);      

      res.status(201).json({
         ok: true,
         uid: usuario.id,
         name: usuario.name,
         token
      });
      
   } catch (error) {
      
      res.status(500).json({
         ok: false,
         msg: 'Algo salio mal'
      });
      
   }
   
}

const loginUsuario = async (req, res = response) => {

   const { email, password } = req.body;   

   try {

      const usuario = await Usuario.findOne({ email: email });

      if(!usuario){
         return res.status(400).json({ok: false, msg: 'Email incorrecto'});
      }

      // confirmar password
      const validPassword = bcrypt.compareSync( password, usuario.password);

      if(!validPassword){
         
         return res.status(400).json({
            ok: false,
            msg: 'Password incorrecto'
         });
      }

      // generar token
      const token = await generarJWT(usuario.id, usuario.name);

      res.json({
         ok: true,
         uid: usuario.id,
         name: usuario.name,
         token
      });
      
   } catch (error) {

      res.status(500).json({
         ok: false,
         msg: 'Algo salio mal'
      });
      
   }
   
}

const revalidarToken = async (req, res = response) => {

   const { uid, name } = req.body;  

   const token = await generarJWT(uid, name);

   res.json({
      ok: true,
      uid,
      token
   })

}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}