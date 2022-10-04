const express = require('express');
const router = express.Router();
const pruebaCotroller = require('../controllers/productoController');
const multer = require('multer');
const upload = multer();

router.post('/', pruebaCotroller.create);
router.put('/:id', pruebaCotroller.update);
router.delete('/:id', pruebaCotroller.delete);

module.exports = router;