const Product = require('../models/product');
//const Order = require('../models/order');
const User = require('../models/User');
const asynchandler = require('../middleware/asyn')

exports.getProducts =asynchandler(async (req, res, next) => {
  const products =await Product.find()

  return res.json({sucess:true,products:products})
    
});

exports.getProduct =asynchandler(async (req, res, next) => {
  const prodId = req.params.productId;
    const product = await Product.findById(prodId)
    return res.json({sucess:true,product:product})
    
});



exports.getCart =asynchandler(async(req, res, next) => 
{
    const user = await User.findById(req.user.id).populate('cart.items.productId').execPopulate()
 
    return res.json({sucess:true,cart:user.cart.items})
 
});



exports.postCart =asynchandler(async(req,res,next)=>{
    const prodId = req.body.productId;
   const user = await User.findById({_id:req.user.id})
    const product = await Product.findById({_id:prodId})
    console.log(user)
   
    const result =await user.addToCart(product)
    console.log(result)
    
    return res.json({sucess:true,msg:'Product added to your cart'})

})

exports.postCartDeleteProduct =asynchandler(async(req, res, next) => {
  const prodId = req.body.productId;
 
   
    const result =await user.removeFromCart(prodId)
    console.log(result)

    return res.json({sucess:true,msg:'Product removed from your cart'})

  
});