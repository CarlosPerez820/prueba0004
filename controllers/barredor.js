const {response} = require('express');
const Barredor = require('../models/barredor');

const barredoresGet = async(req, res = response) => {

    const {limite =200, desde=0} = req.query;
 
    const [total, barredores] = await Promise.all([
        Barredor.countDocuments(),
        Barredor.find()
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
 
    res.json({
        total,
        barredores
    })
}

const barredoresPut = async(req, res = response) => {

    const {id} = req.params;
    const {_id, ...resto} = req.body;

    const barredor = await Barredor.findByIdAndUpdate(id, resto)

    res.json({
        msg: "PUT a mi API - Controlador",
        id,
        barredor
    })
}

const barredoresPost = async (req, res = response) => {
    
    //Obtener los datos que recibimos en el Body por la peticion
    const body = req.body;
    const barredor = new Barredor(body);

    await barredor.save();

    res.json({
        msg: "POST a mi API----- Controlador",
        barredor
    })
}

const barredoresDelete = async(req, res = response) => {

    const {id} = req.params;
    const barredor = await Barredor.findByIdAndDelete(id);

    res.json({
        msg: "DELETE a mi API - Controlador",
        barredor
    })
}

module.exports = {
    barredoresGet,
    barredoresPut,
    barredoresPost,
    barredoresDelete
}