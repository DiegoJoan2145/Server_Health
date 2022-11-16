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
    precioAurrera: {
        type: String
    },
    precioCosto: {
        type: String
    },
    precioWalmart: {
        type: String
    },
    precioChedraui: {
        type: String
    },
    urlImg: {
        type: String
    }
});

module.exports = mongoose.model('Food', FoodSchema);