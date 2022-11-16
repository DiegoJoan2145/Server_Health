const mongoose = require('mongoose');
const ExerciseSchema = mongoose.Schema({
    nombreEjercisio: {
        type: String
    },
    descripcion: {
        type: String
    },
    urlVideo: {
        type: String
    },
    urlImg: {
        type: String
    }
});

module.exports = mongoose.model('Exercise', ExerciseSchema);