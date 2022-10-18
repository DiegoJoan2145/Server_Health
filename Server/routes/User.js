const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const upload = multer();

router.post('/Edit/:id',  upload.none(), userController.edit);
router.post('/Information',  upload.none(), userController.information);
//router.put('/:id', loginController.update);
//router.delete('/:id', loginController.delete);

module.exports = router;