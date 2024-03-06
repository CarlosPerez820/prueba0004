const {response} = require('express');
const Seguimiento = require('../models/seguimiento');

const seguimientosGet = async(req, res = response) => {
 
    const [total, seguimientos] = await Promise.all([
        Seguimiento.countDocuments(),
        Seguimiento.find()
    ]);
 
    res.json({
        total,
        seguimientos
    })
}

const seguimientoEncuestaGet = async(req, res = response) => {

    const {id} = req.params;
 
    const {limite =100, desde=0} = req.query;
    const query = {id_peticion: id};
 
    const [total, notas] = await Promise.all([
        Seguimiento.countDocuments(query),
        Seguimiento.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
 
    res.json({
        total,
        notas
    })
}

const seguimientosPut = async(req, res = response) => {

    const {id} = req.params;
    const {_id,id_peticion, ...resto} = req.body;

    const seguimiento = await Seguimiento.findByIdAndUpdate(id, resto)

    res.json({
        msg: "PUT a mi API - Controlador",
        id,
        seguimiento
    })
}

const seguimientosPost = async (req, res = response) => {
    //Obtener los datos que recibimos en el Body por la peticion
    const body = req.body;
    const seguimiento = new Seguimiento(body);
    await seguimiento.save();

    res.json({
        msg: "POST a mi API----- Controlador",
        seguimiento
    })
}

const seguimientosDelete = async(req, res = response) => {

    const {id} = req.params;
    const seguimiento = await Seguimiento.findByIdAndDelete(id);

    res.json({
        msg: "DELETE a mi API - Controlador",
        seguimiento
    })
}

module.exports = {
    seguimientosGet,
    seguimientosPut,
    seguimientosPost,
    seguimientosDelete,
    seguimientoEncuestaGet
}