const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
var bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

// creamos el servidor
const app = express();


// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
  }));

// conectamos a la bd
conectarDB();

//se abilita midleware para mandar datos json
app.use(express.json());
app.use(cors());

// rutas
app.use('/login', require('./routes/login'));

app.listen(4000, () => {
    console.log('The server is running');
})