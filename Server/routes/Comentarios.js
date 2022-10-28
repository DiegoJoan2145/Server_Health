const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');
const multer = require('multer');
const upload = multer();

router.post('/CreateComments', upload.none(), commentsController.createComments);
router.post('/ShowComments', upload.none(), commentsController.showComments );
//router.put('/:id', loginController.update);
//router.delete('/:id', loginController.delete);

module.exports = router;