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

        const Comentarios = await comentario.create({
            titulo: titulo,
            descripcion: descripcion,
            respuesta: respuesta,
            idUsuario: idUsuario,
        });

        if(!Comentarios.respuesta){
            let nuevaResp = 'No hay respuestas';
            const Respuesta = {
                _id: Comentarios._id,
                titulo: Comentarios.titulo,
                descripcion: Comentarios.descripcion,
                respuesta: nuevaResp,
            }
            return res.send(Respuesta);
        } else {
            const Respuesta = {
                _id: Comentarios._id,
                titulo: Comentarios.titulo,
                descripcion: Comentarios.descripcion,
                respuesta: respuesta,
            }
            return res.send(Respuesta)
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
        })

        if(!user[0].respuesta){
            let nuevaResp = 'No hay respuestas';
            const Respuesta = {
                _id: user[0]._id,
                titulo: user[0].titulo,
                descripcion: user[0].descripcion,
                respuesta: nuevaResp,
            }
            return res.send(Respuesta);
        } else {
            const Respuesta = {
                _id: user[0]._id,
                titulo: user[0].titulo,
                descripcion: user[0].descripcion,
                respuesta: user[0].respuesta,
            }
            return res.send(Respuesta)
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send('There is an error with server');
    }
}