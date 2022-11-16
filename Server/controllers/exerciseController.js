const exercise = require("../models/Exercises");
const response = require("../models/response");
const multer = require('multer');
const upload = multer();
const bcryptjs = require('bcrypt');
const { find } = require("../models/comments");

exports.createExercises = async (req, res) => {
    try {
        const {
               nombreExercise,
               descripcion,
               urlVideo,
               urlImg
        } = req.body;

        console.log(req.body)

        if (!(nombreExercise && descripcion && urlVideo && urlImg)) {
            return res.status(400).json({ message: 'Sorry, all fields are required' });
        }

        const createExer = await exercise.create({
            nombreExercise : nombreExercise,
            descripcion : descripcion,
            urlVideo : urlVideo,
            urlImg : urlImg
        });

        return res.status(200).json(createExer);

    } catch (error) {
        console.log(error);
        return res.status(500).send('There is an error with server');
    }
}

exports.showExercises = async (req, res) => {
    try {

        const exercises = await exercise.find({});

        return res.status(200).json(exercises);
        

    } catch (error) {
        console.log(error);
        return res.status(500).send('There is an error with server');
    }
}