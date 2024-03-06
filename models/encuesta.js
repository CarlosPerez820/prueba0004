const {Schema, model} = require('mongoose');

const EncuestaSchema = Schema({
    fecha: {
        type: String,
        required: [true, 'La fehca de la encuesta es obligatoria'],
    },
    hora: {
        type: String,
        required: [true, 'La hora de la encuesta es obligatoria'],
    },
    latitud: {
        type: Number,
        required: [true, 'La latitud de donde se realizo la encuesta es obligatoria']
    },
    longitud: {
        type: Number,
        required: [true, 'la Longitud de donde se realizo la encuesta es obligatoria']
    },
    direccion: {
        type: String,
        required: [true, 'La direcciond de la encuesta es obligatoria']
    },
    colonia: {
        type: String,
        required: [true, 'La colonia de la encuesta es obligatoria']
    },
    respuesta1: {
        type: String,
        required: [true, ' La respuesta de la pregunta 1 es obligatoria']
    },
    respuesta2: {
        type: String,
        required: [true, ' La respuesta de la pregunta 2 es obligatoria']
    },
    respuesta3: {
        type: String,
        required: [true,  'La respuesta de la pregunta 3 es obligatoria']
    },
    respuesta4:{
        type: String,
        required: [true, 'La respues de la pregunta 4 es obligatoria']
    },
    peticion: {
        type: String,
        required: [true, 'La peticion es obligatoria']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre del ciudadano es obligatorio']
    },
    telefono:{
        type: String,
        required: [true, 'El telefono del ciudadano es obligatorio']
    },
    seguimiento:{
        type: Boolean,
        required: [true, 'la verificacion de solicitud es obligatorio']
    },
    barredor:{
        type: String,
    },
    estado:{
        type: String,
    },
    anotaciones:{
        type: String,
    }
});

EncuestaSchema.methods.toSJON = function(){
    const{__v, ...encuesta} = this.toObject();
    return encuesta;
}

module.exports= model('Encuesta', EncuestaSchema);
