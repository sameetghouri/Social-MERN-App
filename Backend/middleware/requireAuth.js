const jwt = require('jsonwebtoken')
const User = require('../model/userModel')
const requireAuth = async (req,res,next) =>{

    //varify authentication
    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({error:'Authorization token required'})
    }

    const token = authorization.split(' ')[1] //at second position which is [1]

    try{
        const {_id,username} = jwt.verify(token,process.env.SECRET)
        req.user={_id,username}
        
        next()
    } catch(error){
        console.log(error)
        res.status(401).json({error:'Request is not authorized'})
    }

}
module.exports = requireAuth