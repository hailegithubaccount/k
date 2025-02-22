const jwt = require("jsonwebtoken")
const userModel = require("../model/userModel")
require("dotenv").config()


exports.protect=async(req,res,next)=>{

   try {
    let token
    if(req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')){
            token=req.headers.authorization.split(' ')[1]
    } else{
        res.status(400).json({
            status:'success',
            message:'no authentication token is provided'
        })
    }

    const verified = await jwt.verify(token,process.env.JWTSECRATE)
    console.log(verified)
   
        res.locals.id=verified.id.id
        res.locals.role=verified.id.role
   
    next()
   } catch (error) {
    res.status(400).json({
        status:'failed',
        message:error.message
    })
   }
}
exports.isAdmin =async(req,res,next)=>{
  const id= res.locals.id  
  const user=await userModel.findById(id)

  if(!user){
    return (
        res.status(400).json({
            status:'failed',
            message:'user does not exist longer'
        })
    )
}

if(user && user.role !== 'admin'){
    return (
        res.status(401).json({
            status:'failed',
            message:'you dont have a permission to do that'
        })
    )
}

res.locals.admin=user

next()
}

exports.isUser =async(req,res,next)=>{
    const id= res.locals.id  
    const user=await userModel.findById(id)
  
    if(!user){
      return (
          res.status(400).json({
              status:'failed',
              message:'user does not exist longer'
          })
      )
  }
  
  if(user && user.role !== 'user'){
      return (
          res.status(401).json({
              status:'failed',
              message:'you dont have a permission to do that'
          })
      )
  }
  
  res.locals.user=user
  
  next()
  }