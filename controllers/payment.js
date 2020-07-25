const User = require('../models/User')
var payumoney = require('payumoney-node');
payumoney.setKeys(process.env.MERCHANT_KEY, process.env.MERCHANT_SALT, process.env.AUTHORIZATION_HEADER)
const { uuid } = require('uuidv4')
const asynchandler = require('../middleware/asyn')

exports.checkout=asynchandler(async(req,res,next)=>{
    const user = await User.findById({_id:req.user.id}).populate('cart.items.productId')
 
    const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      var sum =0
    products.forEach(prod => {
        sum = sum + prod.quantity*prod.product.price
    });  

    payumoney.isProdMode(false)

    var paymentData = {
    "firstname" : user.name,
    "lastname" : "",
    "email" : user.email,
    "phone" : user.phone,
    "amount" : sum,
    "productinfo" : "",
    "txnid" : uuidv4(),//this must be a genrated at your side
    "surl" : "http:localhost:5000/payment/success",
    "furl" : "http:localhost:5000/payment/failure"
        
    };
     
    payumoney.makePayment(paymentData, function(error, response) {
      if (error) {
        console.log(error)
      } else {
        // Payment redirection link
        return res.json({link:response})
      }
    });



    
})

exports.success =asynchandler(async (req,res,next)=>{
  const user =  await User.findById(req.user.id)
  user.paymentStatus = 'paid'
   await user.clearCart() 
   await user.save()

   return res.json({sucess:true,msg:'Order Placed'})
})

exports.failure =asynchandler(async(req,res,next)=>{
    user.paymentStatus = 'unpaid'
    await user.save()

    return res.json({sucess:false,msg:'Something Went Wrong'})
})







