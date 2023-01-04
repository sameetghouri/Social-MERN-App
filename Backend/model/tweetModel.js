const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tweetSchema = new Schema({
    tweetbody:{
    type: String,
    required: true
    },
    user_id:{
    type: String,
    required:true
    }
}, {timestamps:true})

module.exports= mongoose.model('Tweet',tweetSchema)