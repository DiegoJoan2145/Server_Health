const user = require("../models/health");
const multer = require('multer');
const upload = multer();
const bcryptjs = require('bcrypt');

exports.edit = async (req, res) => {

    try {
        const {
            nombre,
            apellido,
            nickName,
            email,
            fechaNacimiento,
            genero,
            password
        } = req.body;

        const {
            id
        } = req.params;

        if (!(nombre && apellido && nickName && fechaNacimiento && genero && email && password)) {
            return res.status(400).json({ message: 'Sorry, all fields are required' });
        }

        try {
            await user.find(
                {
                    _id: req.params.id
                });
        }
        catch (e) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        let passwordHash = await bcryptjs.hash(password, 8);

        await user.updateOne(
            { 
                "_id": id 
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
                    _id: req.params.id 
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