const comentario = require("../models/comments");
const response = require("../models/response");
const multer = require('multer');
const upload = multer();
const bcryptjs = require('bcrypt');
const { find } = require("../models/comments");

exports.createComments = async (req, res) => {
    try {
        const {
               titulo,
               descripcion,
               idUsuario,
               respuesta
        } = req.body;

        console.log(req.body)

        if (!(titulo && descripcion && idUsuario)) {
            return res.status(400).json({ message: 'Sorry, all fields are required' });
        }

        async function Guardar(titulo, descripcion, respuesta, idUsuario){
            const Comentarios = await comentario.create({
                titulo: titulo,
                descripcion: descripcion,
                respuesta: respuesta,
                idUsuario: idUsuario,
            });
            return Comentarios;
        }

        if(!respuesta){
            let respuesta = 'No hay respuestas';
            Guardar(
                titulo,
                descripcion,
                respuesta,
                idUsuario
            ).then(resp =>{
                return res.status(200).json(resp);
            })
        } else {
            Guardar(
                titulo,
                descripcion,
                respuesta,
                idUsuario
            ).then(resp =>{
                return res.status(200).json(resp);
            })
        }
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
        });

        return res.status(200).json(user);
        

    } catch (error) {
        console.log(error);
        return res.status(500).send('There is an error with server');
    }
}