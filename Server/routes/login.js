const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const multer = require('multer');
const upload = multer();

router.post('/', loginController.createUser);
router.get('/', loginController.login);
//router.put('/:id', loginController.update);
//router.delete('/:id', loginController.delete);

module.exports = router;