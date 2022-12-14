const user = require("../models/health");
const multer = require('multer');
const upload = multer();
const bcryptjs = require('bcrypt');
const transporter = require("../config/mailer");
const jwt = require("jsonwebtoken");
const secret = require("../config/secret");

exports.register = async (req, res) => {
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

exports.forgotPasword = async (req, res) => {

    const {
        email
    } = req.body;
    
    // Se verifica si se trajo correctamente el email
    if(!(email)){
        return res.status(400).json({message: 'Email es requerido'});
    }

    try {

        let userfind = await user.find({ "email" : email}).lean();
        console.log(userfind[0].nombre)
        const storedUser = userfind[0];


        if (userfind.length <= 0) {
            return res.status(404).json({ message: "El email ingresado no existe", code: 1 });
        }

         // variable que almacenar?? la ruta para crear la nueva contrase??a
        let verificationLink;
        // variable que indicar?? e?? status del email
        let emailStatus = 'ok'

        //configuraci??n del token
        const token = jwt.sign({
        email: storedUser.email,
        password: storedUser.password
        },
        secret.secret.jwtSecret, {expiresIn: '20m'});

        var neww = token.toString();

        //lo enviaremos a trav??s de un correo electr??nico
          
        //guardamos el token del usuario en la base de datos
         const newuser = await user.updateOne(
            {
             "_id" : storedUser._id,
            },
            {
             "token" : neww
            });

         // Configuraci??n Nodemailer para enviar el correo electr??nico
         let info = await transporter.transporter.sendMail({
             from: '"Health" <healthCompanyRSV@gmail.com>', // sender address
             to: storedUser.email, // list of receivers
             subject: `Recuperaci??n de Contrase??a`, // Subject line
             html: `<h3>Hola ${storedUser.nombre} este es un correo con el que podr??s recuperar tu contrase??a de forma segura<h3/>
             <br>
             <b>A continuaci??n, te proporcionamos tu c??digo de verificaci??n</b>
             <h5>${token}</h5>`
         });

         return res.status(200).json({message: 'Correo electr??nico enviado',  info: emailStatus});
        
        
    } catch (error) {
        return res.status(500).json({ message: `${error.message}` });
    }

}


exports.createNewPassword = async (req, res) => {
    const {
        newPassword,
        token
    } = req.body;

        //validaci??n de los campos requeridos
    if(!(newPassword && token)){
      return res.status(400).json({message: "todos los campos son requeridos", code: 1});
    }

    try {

        const userfind = await user.find({
            "token" : token
        });
        const storedUser = userfind[0];

        if (userfind.length <= 0){
            return res.status(400).json({message: "No se puede recuperar la contrase??a, verifique so c??digo enviado a su correo electr??nico"});
        }

        const hashedPassword = await bcryptjs.hash(newPassword, 12);

      //update password
      const newp = await user.updateOne
      (
        {
            "_id" : storedUser._id
        },
        {
            password : hashedPassword
        }
    );

    return res.status(200).json({message: 'La contrase??a se ha cambiado con ??xito'});
        
    } catch (error) {
        
    }



}
