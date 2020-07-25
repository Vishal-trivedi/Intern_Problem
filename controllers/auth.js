const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User')
const asynchandler = require('../middleware/asyn')


exports.register =asynchandler(async (req,res,next) =>{
    const {name,email,password,role} = req.body

    const user  =await User.create({
        name,
        email,
        password,
        role
    })
    sendTokenResponse(user,200,res)
    
    })
    exports.login =asynchandler(async (req,res,next) =>{
        const {email,password} = req.body
        const user = await User.findOne({email}).select('+password')

        if(!user){
            return res.status(401).json({sucess:false,error:'Invalid Credentials'})
        }
    
        const isMatch =await user.matchPassword(password)
        if(!isMatch){
            return res.status(401).json({sucess:false,error:'Invalid Credentials'})
        }
        sendTokenResponse(user,200,res)
    })
   
    const sendTokenResponse = (user,statusCode,res)=>{
        const token = user.getSignedJwtToken()
     const options = {
         expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
        httpOnly:true         
     }
    

    return res
    .status(statusCode)
    .cookie('token',token,options)
    .json({
        sucess:true,
        token
    })

    }

   
