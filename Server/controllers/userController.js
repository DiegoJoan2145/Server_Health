const user = require("../models/health");
const multer = require('multer');
const upload = multer();
const bcryptjs = require('bcrypt');

exports.edit = async (req, res) => {

    const {
        id, 
        nombre,
        apellido,
        nickName,
        email,
        fechaNacimiento,
        genero,
        //password
    } = req.body;

}

exports.information = async (req, res) => {

}