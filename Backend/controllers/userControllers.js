const User = require('../model/userModel')
const jwt = require('jsonwebtoken')


const createToken=(_id,username)=>{
   return jwt.sign({_id,username},process.env.SECRET) //here id is the payload it can have multiple payloads e.g name
}
//login user
const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.login(email,password)
        const token = createToken(user._id,user.username)
        res.status(200).json({name:user.username,id:user._id, dp:user.userimage, token})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

 
  
 

   //signup user
   const signupUser = async (req,res)=>{
    
    const {username,email,password} = req.body;
    try{
        const user = await User.signup(
            username,
            userimage = req.file?.path.slice(19) || null,
            email,
            password)
        const token = createToken(user._id,user.username)
        res.status(200).json({name:user.username,id:user._id, dp:user.userimage,token})
    }catch(error){
        res.status(400).json({error:error.message})
    }
    
}

//delete user
const deleteUser= async (req,res)=>{
    const{email}=req.body
    
    const user = await User.findOneAndDelete({email})
    if(!user){
        return res.status(404).json({error:"No user Found"})
    }
    res.status(200).json({mssg:"User Deleted"})

}

module.exports={
    loginUser,
    signupUser,
    deleteUser
}