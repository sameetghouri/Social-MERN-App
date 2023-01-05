const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tweetSchema = new Schema({
    tweetauthor: {
    type:String,
    required: true
    },
    tweetbody:{
    type: String
    },
    tweetimage: {
    type:String
    },
    likes: {
    type:Array
    },
    comments: {
    type:Array
    },
    user_id:{
    type: String,
    required:true
    }
    
    
    
    
}, {timestamps:true})

module.exports= mongoose.model('Tweet',tweetSchema)