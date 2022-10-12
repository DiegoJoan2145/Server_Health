const mongoose = require('mongoose');
const UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String
    },
    apellido: {
        type: String
    },
    nickName: {
        type: String
    },
    email: {
        type: String
    },
    fechaNacimiento: {
        type: String
    },
    genero: {
        type: String
    },
    password: {
        type: String
    },

});

module.exports = mongoose.model('Usuario', UsuarioSchema);