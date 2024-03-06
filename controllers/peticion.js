const {response} = require('express');
const Peticion = require('../models/peticion');

const peticionesGet = async(req, res = response) => {
 
    const [total, peticiones] = await Promise.all([
        Peticion.countDocuments(),
        Peticion.find()
    ]);
 
    res.json({
        total,
        peticiones
    })
}

const peticionesPut = async(req, res = response) => {

    const {id} = req.params;
    const {_id, ...resto} = req.body;

    const peticion = await Peticion.findByIdAndUpdate(id, resto)

    res.json({
        msg: "PUT a mi API - Controlador",
        id,
        peticion
    })
}

const peticionesPost = async (req, res = response) => {
    //Obtener los datos que recibimos en el Body por la peticion
    const body = req.body;
    const peticion = new Peticion(body);
    await peticion.save();

    res.json({
        msg: "POST a mi API----- Controlador",
        peticion
    })
}

const peticionesDelete = async(req, res = response) => {

    const {id} = req.params;
    const peticion = await Peticion.findByIdAndDelete(id);

    res.json({
        msg: "DELETE a mi API - Controlador",
        peticion
    })
}

module.exports = {
    peticionesGet,
    peticionesPut,
    peticionesPost,
    peticionesDelete
}