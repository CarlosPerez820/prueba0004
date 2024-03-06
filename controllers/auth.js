const {response} = require('express');
const Usuario = require('../models/usuario');
const Barredor = require('../models/barredor');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req, res = response)=>{
    const {correo, password} = req.body;

    try {
     
        //Verificar si el Email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos-correo'
            })
        } 

        //verificar si es usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos-estado:False'
            })
        } 

        //verificar la contraseña
        const validarPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validarPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos-password'
            })
        } 

        const token = await generarJWT(usuario.id, usuario.rol, usuario.correo, usuario.nombre);

        res.json({
            msg:'Login OK',
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Contacte con el administrador'
        })
    }
}

const encuestas = async(req, res = response)=>{
    const {usuario, password} = req.body;

    try {
        //Verificar si el usuario existe
        const barredor = await Barredor.findOne({usuario});
        if(!barredor){
            return res.status(400).json({
                msg: 'Usuario / Password Verifica tus credenciales User'
            })
        }
 
        //verificar la contraseña
        if(barredor.password!=password){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos-password'
            })
        } 
 
        const token = await generarJWT(barredor.id, 'encuestador', barredor.usuario, barredor.nombre);
 
        res.json({
            msg:'Login Solo para Encuestas OK',
            barredor,
            token
        })
            
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Contacte con el administrador'
        })
    }
}


module.exports={
    login,
    encuestas
}