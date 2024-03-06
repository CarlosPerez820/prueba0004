const {Schema, model} = require('mongoose');

const BarredorSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del barredor es obligatorio'],
    },
    usuario: {
        type: String,
        required: [true, 'El usuario del barredor es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La password del barredor es obligatoria'],
    },
    ruta:{
        type: String,
        required: [true , 'La ruta del barredor es requerida'],
    },
    numeroEncuestas:{
        type: Number,
        default:0
    }
});

BarredorSchema.methods.toJSON = function (){
    const{__v, ...barredor} = this.toObject();
    return barredor;
}

module.exports = model('Barredor', BarredorSchema);
