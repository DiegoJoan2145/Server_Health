const mongoose = require('mongoose');
const ComentarioSchema = mongoose.Schema({
    titulo: {
        type: String
    },
    descripcion: {
        type: String
    },
    respuesta: {
        type: String
    },
    idUsuario: {
        type: mongoose.Types.ObjectId
    }
});

module.exports = mongoose.model('Comentario', ComentarioSchema);