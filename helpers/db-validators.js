const Usuario = require('../models/usuario');
const Barredor = require('../models/barredor');
const Encuesta = require('../models/encuesta');
const Peticion = require('../models/peticion');
const Seguimiento = require('../models/seguimiento');

const correoDisponible = async(correo)=>{
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail)
    {
        throw new Error(`El correo: ${correo} ya existe en la base de datos`);
    }
}

const usuarioDisponible = async(usuario)=>{
    const existeUsuario = await Barredor.findOne({usuario});
    if(existeUsuario)
    {
        throw new Error(`El usuario: ${usuario} ya existe en la base de datos`);
    }
}

const existeUsuarioID = async(id)=>{
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario)
    {   
        throw new Error(`El ID: ${id} no existe en la base de datos`);
    }
}

const existeBarredorID = async(id)=>{
    const existeBarredor = await Barredor.findById(id);
    if(!existeBarredor)
    {   
        throw new Error(`El ID: ${id} no existe en la base de datos`);
    }
}

const existeEncuestaID = async(id)=>{
    const existeEncuesta = await Encuesta.findById(id);
    if(!existeEncuesta)
    {   
        throw new Error(`El ID: ${id} no existe en la base de datos`);
    }
}

const existePeticionID = async(id)=>{
    const existePeticion = await Encuesta.findById(id);
    if(!existePeticion)
    {   
        throw new Error(`El ID: ${id} no existe en la base de datos`);
    }
}

const existeSeguimientoID = async(id)=>{
    const existeSeguimiento = await Seguimiento.findById(id);
    if(!existeSeguimiento)
    {   
        throw new Error(`El ID: ${id} no existe en la base de datos`);
    }
}

module.exports = {
    correoDisponible,
    existeUsuarioID,
    existeBarredorID,
    usuarioDisponible,
    existeEncuestaID,
    existePeticionID,
    existeSeguimientoID
}