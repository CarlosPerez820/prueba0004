const {response} = require('express');
const Encuesta = require('../models/encuesta');

const encuestasGet = async(req, res = response) => {
 
    const [total, encuestas] = await Promise.all([
        Encuesta.countDocuments(),
        Encuesta.find()
    ]);
 
    res.json({
        total,
        encuestas
    })
}


const peticionesGet = async(req, res = response) => {

    const {limite =5000, desde=0} = req.query;
    const query = {seguimiento: true};
 
    const [total, peticiones] = await Promise.all([
        Encuesta.countDocuments(query),
        Encuesta.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
 
    res.json({
        total,
        peticiones
    })
}

const encuestaEspecificaGet = async(req, res= response)=>{
    const {id} = req.params;
    //Validar contra la BD
    const encuesta = await Encuesta.findById(id)

    res.json({
        encuesta
    })
}


const encuestasPut = async(req, res = response) => {

    const {id} = req.params;
    const {_id, ...resto} = req.body;

    const encuesta = await Encuesta.findByIdAndUpdate(id, resto)

    res.json({
        msg: "PUT a mi API - Controlador",
        id,
        encuesta
    })
}

const encuestasPost = async (req, res = response) => {
    //Obtener los datos que recibimos en el Body por la peticion
    const body = req.body;
    const encuesta = new Encuesta(body);
    await encuesta.save();

    res.json({
        msg: "POST a mi API----- Controlador",
        encuesta
    })
}

const encuestasDelete = async(req, res = response) => {

    const {id} = req.params;
    const encuesta = await Encuesta.findByIdAndDelete(id);

    res.json({
        msg: "DELETE a mi API - Controlador",
        encuesta
    })
}

module.exports = {
    encuestasGet,
    peticionesGet,
    encuestaEspecificaGet,
    encuestasPut,
    encuestasPost,
    encuestasDelete
}