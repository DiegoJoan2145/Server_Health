const express = require('express');
const router = express.Router();
const foodsController = require('../controllers/foodsController');
const multer = require('multer');
const upload = multer();

router.post('/CreateFoods', upload.none(), foodsController.createFoods);
router.post('/ShowFoods', upload.none(), foodsController.showFoodTable );
router.post('/ShowFoodsAll', upload.none(), foodsController.showFoodAll );
//router.put('/:id', loginController.update);
//router.delete('/:id', loginController.delete);

module.exports = router;