const mongoose = require('mongoose');
const ResponseSchema = mongoose.Schema({
    descripcion: {
        type: String
    },
    idComment: {
        type: String
    }
});

module.exports = mongoose.model('Response', ResponseSchema);