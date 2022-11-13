const food = require("../models/foods");
const response = require("../models/response");
const multer = require('multer');
const upload = multer();
const bcryptjs = require('bcrypt');
const { find } = require("../models/comments");


exports.createFoods = async (req, res) => {
    try {
        const {
               nombreAlimento,
               calorias,
               proteinas,
               lipidos,
               hidratosCarbono,
               categoriaAlimento,
               urlImg
        } = req.body;

        if (!(nombreAlimento && calorias && proteinas && lipidos && hidratosCarbono && categoriaAlimento)) {
            return res.status(400).json({ message: 'Sorry, all fields are required' });
        }

        async function Guardar(nombreAlimento, calorias, proteinas, lipidos, hidratosCarbono, categoriaAlimento, urlImg){
            const Foods = await food.create({
                nombreAlimento : nombreAlimento,
                calorias : calorias,
                proteinas : proteinas,
                lipidos : lipidos,
                hidratosCarbono : hidratosCarbono,
                categoriaAlimento : categoriaAlimento,
                urlImg : urlImg
            });
            return Foods;
        }

        if(!urlImg){
            let urlImg = 'No hay imagen';
            Guardar(nombreAlimento,calorias,proteinas,lipidos, hidratosCarbono, categoriaAlimento, urlImg)
                .then(resp =>{
                    return res.status(200).json(resp);
                });
        } else {
            Guardar(nombreAlimento,calorias,proteinas,lipidos, hidratosCarbono, categoriaAlimento, urlImg)
                .then(resp =>{
                    return res.status(200).json(resp);
                });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('There is an error with server');
    }
}

exports.showFoodTable = async (req, res) => {
    try {

        const {
            categoria
        } = req.body;

        if(!categoria){
            return res.status(400).json('categoria fild is required');
        }

        const foods = await food.find({
            "categoriaAlimento" : categoria
        });

        if (foods == 0) {
            return res.status(200).json('No hay productos a mostrar');
        }

        return res.status(200).json(foods);
        

    } catch (error) {
        console.log(error);
        return res.status(500).send('There is an error with server');
    }
}

exports.showFoodAll = async (req, res) => {
    try {

        const foods = await food.find({});

        if (foods == 0) {
            return res.status(200).json('No hay productos a mostrar');
        }

        return res.status(200).json(foods);
        

    } catch (error) {
        console.log(error);
        return res.status(500).send('There is an error with server');
    }
}