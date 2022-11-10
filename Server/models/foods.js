const mongoose = require('mongoose');
const FoodSchema = mongoose.Schema({
    nombreAlimento: {
        type: String
    },
    calorias: {
        type: String
    },
    proteinas: {
        type: String
    },
    lipidos: {
        type: String
    },
    hidratosCarbono: {
        type: String
    },
    categoriaAlimento: {
        type: String
    },
    urlImg: {
        type: String
    }
});

module.exports = mongoose.model('Food', FoodSchema);