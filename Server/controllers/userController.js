const user = require("../models/health");
const multer = require('multer');
const upload = multer();
const bcryptjs = require('bcrypt');

exports.edit = async (req, res) => {

    try {
        const {
            idUsuario,
            nombre,
            apellido,
            nickName,
            email,
            fechaNacimiento,
            genero
        } = req.body;

        if (!(idUsuario, nombre && apellido && nickName && fechaNacimiento && genero && email)) {
            return res.status(400).json({ message: 'Sorry, all fields are required' });
        }

        try {
            await user.find(
                {
                    _id: idUsuario
                });
        }
        catch (e) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        await user.updateOne(
            { 
                "_id": idUsuario
            },
            {
                nombre: nombre,
                apellido: apellido,
                nickName: nickName,
                email: email,
                fechaNacimiento: fechaNacimiento,
                genero: genero
            }
        )
            .then((ok) => {
                return ok;
            })
            .catch((error) => {
                console.log(error);
                return res.status(404).json({ message: 'error updating user.' });
            })

        try {
            let userNew = await user.find
                ({ 
                    _id: idUsuario
                });

            return res.status(200).json(userNew[0]);
        }
        catch (e) {
            return res.status(404).json({ message: 'error finding new user.' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('There is an error with server');
    }
}

exports.information = async (req, res) => {
    try {

        const idUsuario = req.params.id;

        if (!idUsuario) {
            return res.status(400).json({ message: 'Sorry, all fields are required' });
        }

        const info = await user.find({
                    _id: idUsuario
        })
        return res.status(200).json(info[0]);

    } catch (error) {
        console.log(error);
        return res.status(500).send('There is an error with server');
    }
}

exports.informationPost = async (req, res) => {
    try {

        const { idUsuario } = req.body;

        console.log(idUsuario);

        if (!idUsuario) {
            return res.status(400).json({ message: 'Sorry, all fields are required' });
        }

        const info = await user.find({
                    _id: idUsuario
        })
        return res.status(200).json(info[0]);

    } catch (error) {
        console.log(error);
        return res.status(500).send('There is an error with server');
    }
}