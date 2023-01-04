const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator') 
const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
    type: String,
    required: true
    },
    userimage: {
    type:String
    },
    email:{
    type: String,
    required: true,
    unique:true
    },
    password:{
    type: String,
    required: true
    }
})
 // static signup method
 userSchema.statics.signup = async function(username,userimage,email,password){
    
    //validation
    if(!username || !email|| !password) {
        throw Error("All Fields must be filled")
    }
    if(!validator.isEmail(email)){
        throw Error ("Enter the valid Email ")
    }
    if(!validator.isLength(password,8,100) ){
        throw Error ("Enter the minimum 8 digit Password")
    }

    
    
    const exist = await this.findOne({email})
    if(exist){
        throw Error('Email already Exists')
    }
    const salt = await bcrypt.genSalt(10) // 10 is the size of salt values
    const hash = await bcrypt.hash(password,salt)
    const user = await this.create({username,userimage,email,password:hash})
    return user
 }

 //static login method
 userSchema.statics.login = async function(email,password){
    if(!email|| !password) {
        throw Error("All Fields must be filled")
    }
    const user = await this.findOne({email})
    if(!user){
        throw Error('Email do not exist')
    }
    const match = await bcrypt.compare(password,user.password)
    if(!match){
        throw Error ('Incorrect Password')
    }
    return user
 }

module.exports= mongoose.model('User',userSchema)

