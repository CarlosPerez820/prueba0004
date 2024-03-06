const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del usuario es obligatorio'],
    },
    correo: {
        type: String,
        required: [true, 'El correo del usuario es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La Password del usuario es obligatorio']
    },
    rol: {
        type: String,
        required: [true, 'El rol del  usuario es obligatorio']
    },
    estado:{
        type: Boolean,
        default: true
    }
});

UsuarioSchema.methods.toJSON = function(){
    const{__V, ...usuario} = this.toObject();
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);