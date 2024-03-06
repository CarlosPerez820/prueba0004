const {Schema, model} = require('mongoose');

const PeticionSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre del ciudadano es obligatorio']
    },
    telefono:{
        type: String,
        required:[true, 'El telefono es obligatorio']
    },
    peticiones:{
        type: String,
        required:[true, 'La peticion es obligatoria'],
    },
    direccion: {
        type: String,
        required: [true, 'La direccion es obligatoria'],
    },
    latitud: {
        type: String,
        required: [true, 'La latitud es obligatoria']
    },
    longitud: {
        type: String,
        required: [true, 'La longitud es obligatoria']
    },
    barredor: {
        type: String,
        required: [true, 'El barredor de la peticion es obligatorio']
    },
    estado: {
        type: String,
        required: [true, 'El estado de la peticion es obligatorio']
    },
    anotaciones: {
        type: String,
        required: [true, 'Las anotaciones son obligatorias']
    }
});

PeticionSchema.methods.toJSON = function(){
    const{__v, ...peticion} = this.toObject();
    return peticion;
}

module.exports = model('Peticion', PeticionSchema);