const Product = require('../models/product')
const asynchandler = require('../middleware/asyn');
const User = require('../models/User');

exports.postAddProduct =asynchandler(async(req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product({
      title: title,
      price: price,
      description: description,
      imageUrl: imageUrl,
      userId: req.user.id
    });
    
    await product.save()
   return res.json({sucess:true,msg:'New product added'})

  });

  exports.getProducts =asynchandler(async(req, res, next) => {
    const products = await Product.find()
   return res.json({products:products})   
  })
  
  exports.postDeleteProduct =asynchandler(async (req, res, next) => {
    const user = await User.findById({_id:req.user.id})
    if(user.userId != user.id){
        return res.json({sucess:false,msg:'Not authorized to do this '})
    }
    
    const prodId = req.body.productId;
  const product =await Product.findByIdAndRemove(prodId)
  return res.json({sucess:true,msg:'product removed'})

      
  });
  

