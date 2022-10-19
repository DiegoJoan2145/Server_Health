const comentario = require("../models/comments");
const multer = require('multer');
const upload = multer();
const bcryptjs = require('bcrypt');

exports.createComments = async (req, res) => {
    try {
        const { titulo,
                descripcion
            } = req.body;
        
        const {
            id
        } = req.params;

        if (!(titulo && descripcion)) {
            return res.status(400).json({ message: 'Sorry, all fields are required' });
        }
        
        const Comentarios = await comentario.create({
            titulo: titulo,
            descripcion: descripcion,
            idUsuario: id
        });

        res.send(Comentarios);

    } catch (error) {
        console.log(error);
        return res.status(500).send('There is an error with server');
    }
}