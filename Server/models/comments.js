const mongoose = require('mongoose');
const ComentarioSchema = mongoose.Schema({
    titulo: {
        type: String
    },
    descripcion: {
        type: String
    },
    idUsuario: {
        type: String
    }
});

module.exports = mongoose.model('Comentario', ComentarioSchema);