const express = require('express')
const {getProducts,postAddProduct,postDeleteProduct} = require('../controllers/admin')

const router = express.Router()

const {protect,authorize} = require('../middleware/auth')


// /admin/products => GET
router.get('/products', getProducts);

// /admin/add-product => POST
router.post('/add-product',protect,authorize('admin'),postAddProduct);



router.post('/delete-product',protect,authorize('admin'), postDeleteProduct);




module.exports = router;