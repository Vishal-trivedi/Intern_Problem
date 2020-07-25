const express = require('express')
const {getProduct,getProducts,getCart,postCart,postCartDeleteProduct} = require('../controllers/shop')

const router = express.Router()

const {protect} = require('../middleware/auth')


router.get('/products',getProducts);

router.get('/products/:productId',getProduct);

router.get('/cart',protect,getCart);

router.post('/cart',protect,postCart);

router.post('/cart-delete-item', protect,postCartDeleteProduct)

module.exports = router;