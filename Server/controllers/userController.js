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
            genero,
            password
        } = req.body;

        if (!(idUsuario, nombre && apellido && nickName && fechaNacimiento && genero && email && password)) {
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

        let passwordHash = await bcryptjs.hash(password, 8);

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
                genero: genero,
                password: passwordHash
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

}