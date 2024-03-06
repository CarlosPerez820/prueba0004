const {Schema, model} = require('mongoose');

const SeguimientoSchema = Schema({
    id_peticion: { 
        type: Schema.Types.ObjectId, 
        ref: 'Encuesta', 
        required: [true, 'El id_peticion es obligatorio'] 
    },
    fecha: {
        type: String,
        required: [true, 'La fecha es obligatoria'],
    },
    hora: {
        type: String,
        required: [true, 'La hora es obligatoria'],
    },
    nota: {
        type:String,
        required: [true, ' La nota es obligatoria']
    }
});

SeguimientoSchema.methods.toJSON = function(){
    const{__v, ...seguimiento} = this.toObject();
    return seguimiento;
}

module.exports = model('Seguimiento', SeguimientoSchema);
