const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');
const multer = require('multer');
const upload = multer();

router.post('/ShowExercises', upload.none(), exerciseController.showExercises );
router.post('/CreateExercises', upload.none(), exerciseController.createExercises);
//router.put('/:id', loginController.update);
//router.delete('/:id', loginController.delete);

module.exports = router;