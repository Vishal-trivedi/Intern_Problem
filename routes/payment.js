const express = require('express')
const {checkout,success,failure} = require('../controllers/payment')

const router = express.Router()

const {protect} = require('../middleware/auth')


router.get('/pay',protect,checkout);

router.get('/payment/success',protect,success);


router.get('/payment/failure',protect,failure);


module.exports = router;