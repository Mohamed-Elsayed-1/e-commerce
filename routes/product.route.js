const router = require('express').Router();
const productController = require('../controller/product.controller')

router.get('/',productController.getProduct)
router.get('/:id',productController.getProductById)

module.exports = router;