const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const multer = require('multer');
const upload = multer();

router.post('/Register',  upload.none(), loginController.register);
router.post('/',  upload.none(),loginController.login);
router.post('/ForgotPassword',  upload.none(),loginController.forgotPasword);
router.put('/new-password/',  upload.none(),loginController.createNewPassword);
//router.put('/:id', loginController.update);
//router.delete('/:id', loginController.delete);

module.exports = router;