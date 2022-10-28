const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const upload = multer();

router.post('/Edit',  upload.none(), userController.edit);
router.get('/Information/:id',  upload.none(), userController.information);
//router.put('/:id', loginController.update);
//router.delete('/:id', loginController.delete);

module.exports = router;