const mongoose = require('mongoose');
const PruebaSchema = mongoose.Schema({
    nombre: {
        type: String
    },
    descripcion: {
        type: String
    }


});

module.exports = mongoose.model('Prueba', PruebaSchema);