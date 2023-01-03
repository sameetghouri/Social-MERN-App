const Tweet = require('../model/tweetModel')
const mongoose = require('mongoose')



//get all Tweets
const getTweets = async (req,res) =>{
    const tweet = await Tweet.find().sort({createdAt:-1})
    res.status(200).json(tweet)
}

//get one user Tweets
const getoneuserTweets = async (req,res) =>{
    const user_id = req.user._id

    const tweet = await Tweet.find({user_id}).sort({createdAt:-1})
    res.status(200).json(tweet)
}

//get single Tweet
const getTweet = async (req,res)=>{    
        const {id} =req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: "Tweet id not valid"})
        }
        
        const tweet = await Tweet.findById(id)
        if(!tweet){
            return res.status(404).json({error:"No tweet Found"})
        }
        res.status(200).json(tweet)    
}

//Post a new Tweet
const createTweet = async (req,res)=>{
    const {tweet}=req.body 

    let emptyFields = []
     if(!tweet){emptyFields.push('title')}
     
     if(emptyFields.length>0){
        return res.status(400).json({error:'Please Fill the field',emptyFields})
     }
    try{
    const user_id = req.user._id
    const tweet= await Tweet.create({tweet,user_id})
    res.status(200).json(tweet)
    }catch(error){
        res.status(400).json({error:error.message})
    } 
    }

//Delete a Tweet
const deleteTweet= async (req,res)=>{
    const {id} =req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Invalid Tweet id"})
    }
    
    const tweet = await Tweet.findByIdAndDelete(id)
    if(!tweet){
        return res.status(404).json({error:"No Tweet Found"})
    }
    res.status(200).json(tweet)  
}

//Update a Tweet
const updateTweet = async (req,res)=>{
    const {id} =req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Invalid tweet id"})
    }
    
    const tweet= await Tweet.findByIdAndUpdate(id, req.body)
    if(!tweet){
        return res.status(404).json({error:"No Tweet Found"})
    }
    res.status(200).json(tweet)
}
module.exports={
    getTweets,getoneuserTweets,getTweet,
    createTweet,deleteTweet,updateTweet
}