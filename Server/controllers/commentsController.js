const comentario = require("../models/comments");
const multer = require('multer');
const upload = multer();
const bcryptjs = require('bcrypt');

exports.createComments = async (req, res) => {
    try {
        const {
               titulo,
               descripcion,
               idUsuario
        } = req.body;

        console.log(req.body)

        if (!(titulo && descripcion && idUsuario)) {
            return res.status(400).json({ message: 'Sorry, all fields are required' });
        }
        
        const Comentarios = await comentario.create({
            titulo: titulo,
            descripcion: descripcion,
            idUsuario: idUsuario
        });

        res.send(Comentarios);

    } catch (error) {
        console.log(error);
        return res.status(500).send('There is an error with server');
    }
}

exports.showComments = async (req, res) => {
    try {

        const {
            idUsuario
        } = req.body;


        if (!idUsuario) {
            return res.status(400).json({ message: 'Sorry, all fields are required' });
        }

        const user = await comentario.find({
                    idUsuario: idUsuario
        })

        res.send(user);

    } catch (error) {
        console.log(error);
        return res.status(500).send('There is an error with server');
    }
}