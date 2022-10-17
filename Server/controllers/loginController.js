const user = require("../models/health");
const multer = require('multer');
const upload = multer();

exports.createUser = async (req, res) => {
    try {
        const { nombre,
                apellido,
                nickName,
                email, 
                fechaNacimiento,
                genero, 
                password 
            } = req.body; //obtenemos datos desde el body
            
            
            if( !(nombre && apellido && nickName && fechaNacimiento && genero && email && password)) {
                res.status(400).json({ message : 'All fields are required'});
            }
        
        const userEmail = await user.find({ "email" : email }, {email:1});
        console.log(userEmail)
        
        if (userEmail[0]) {
           return res.status(400).json({message: 'This email already exist!'});
        } 
        
        let userLogin;

        //creamos el producto
        userLogin = new user(req.body);
        console.log(req.body)
        await userLogin.save();
        res.send(userLogin);
        //}
    } catch (error) {
        console.log(error);
        res.status(500).send('There is an error');
    }
}

exports.login = async (req, res) => {

    const { email, password } = req.body; //obtenemos datos desde el body

    //return;

     /**
      * @description verificamos que obtengamos las propiedades desde el front-end
      * @param {username, password}
      */
     if( !(email && password)) {
         res.status(400).json({ message : 'username and password are required'});
     }

     // Finding User by email
     const userEmail = await user.find({ "email" : email }, {email:1});
     console.log(userEmail);

     if (userEmail == 0) {
        return res.status(400).json({message: 'Email does not exist'});
     } else {
        // Finding User by password
        const userPassword = await user.find({ "password" : password }, {password:1});

        if (userPassword == 0) {
            return res.status(400).json({message: 'Password does not exist'});
        } else {

            const emailOk = await user.find( { "email" : email }, {email:1, password:1});            
            return res.status(200).json({message: 'User information', info: emailOk});
        }
    }

    }
