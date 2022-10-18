const user = require("../models/health");
const multer = require('multer');
const upload = multer();
const bcryptjs = require('bcrypt');

exports.createUser = async (req, res) => {
    try {
        const { nombre,
                apellido,
                nickName,
                email,
                fechaNacimiento,
                genero,
                password
            } = req.body;

        if (!(nombre && apellido && nickName && fechaNacimiento && genero && email && password)) {
            return res.status(400).json({ message: 'Sorry, all fields are required' });
        }

        const userEmail = await user.find(
            { 
                "email": email 
            }, 
            { 
                email: 1 
            });

        if (userEmail[0]) {
            return res.status(400).json({ message: 'This email already exist!' });
        }

        let passwordHash = await bcryptjs.hash(password, 8);
        
        const userLogin = await user.create({
            nombre: nombre,
            apellido: apellido,
            nickName: nickName,
            email: email,
            fechaNacimiento: fechaNacimiento,
            genero: genero,
            password: passwordHash
        });

        res.send(userLogin);

    } catch (error) {
        console.log(error);
        return res.status(500).send('There is an error with server');
    }
}

exports.login = async (req, res) => {

    const { email, password } = req.body;

    try {

        if (!(email && password)) {
            return res.status(400).json({ message: 'username and password are required' });
        }

        let userEmail = await user.find(
            { 
                "email": email
            },
            { 
                email: 1 
            });

        if (userEmail == 0) {
            return res.status(400).json({ message: 'Email does not exist' });
        } else {
            const usernew = await user.find(
                { 
                    "email": email 
                });

            const cmp = await bcryptjs.compare(password, usernew[0].password);

            if (cmp == 0) {
                return res.status(400).json({ message: 'Password does not exist' });
            } else {
                const emailOk = await user.find(
                    {
                     "email": email 
                    }, 
                    { 
                        _id:1,
                        nombre:1, 
                        apellido:1, 
                        nickName: 1, 
                        fechaNacimiento: 1, 
                        genero: 1,  email: 1, 
                        password: 1 
                    });

                return res.status(200).json(emailOk[0]);
            }
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send('There is an error with server');
    }
}
