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


    if(!req.body.tweetbody && !req.file){
        return res.status(400).json({error:'Please write the tweet or upload an image'})
    }
    try{
        console.log(req.user)
        const user_id = req.user._id
        const tweetauthor = req.user.username
    
    const tweet = await Tweet.create({
        tweetauthor,
        tweetauthordp:req.body?.dp || null,
        tweetbody: req.body?.tweetbody || null,
        tweetimage: req.file?.path.slice(15) || null,
        user_id})
    res.status(200).json(tweet)
    }catch(error){
        res.status(400).json({error:error.message})
    } 
    }

//Delete a Tweet
const deleteTweet= async (req,res)=>{
    const {id} =req.params
    try{
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Invalid Tweet id"})
    }
    
    const tweet = await Tweet.findByIdAndDelete(id)
    if(!tweet){
        return res.status(404).json({error:"No Tweet Found"})
    }
     res.status(200).json(tweet)  
}catch(error){
    res.status(404).json({error:" error in delete request"})
}  
}

//Update a Tweet
const updateTweet = async (req,res)=>{
    const {id} =req.params
    try{
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Invalid tweet id"})
    }
    
    const tweet= await Tweet.findByIdAndUpdate(id, req.body)
    if(!tweet){
        return res.status(404).json({error:"No Tweet Found"})
    }
     res.status(200).json(tweet)
    }catch(error){
        res.status(400).json({error:" error in update request"})
   }
}

//likes a tweet
const likeTweet = async (req,res)=>{
    const { id } = req.params;
    try{
      const tweet = await Tweet.findById(id)
      if(!tweet){
          return res.status(404).json({error:"No tweet Found"})}
      
      if(tweet.likes.includes(req.user._id)){
        return res.send({message:" you've alread reacted" })}
        
      await Tweet.findByIdAndUpdate(id,{likes: [...tweet.likes, req.user._id]})
      const updatedtweet = await Tweet.findById(id)
      res.status(200).json(updatedtweet)
      }catch(error){
        res.status(400).json({error:" error in update request"})
   }  
      
  }

  //unlikes a tweet
const unlikeTweet = async (req,res)=>{
    const { id } = req.params;
    try{
        const tweet = await Tweet.findById(id)
        if(!tweet){
            return res.status(404).json({error:"No tweet Found"})}
        
        if(tweet.likes.includes(req.user._id)){
            await Tweet.findByIdAndUpdate(id,{likes: tweet.likes.filter((like)=>like!==req.user._id)})
            const updatedtweet = await Tweet.findById(id)
            return res.status(200).json(updatedtweet)
            
            
          }

         res.send({message:" First like the tweet" }) 
        }catch(error){
            res.send({error, message:" error in unlike request"})
       }  
         
}
 

//comment on a tweet
const commentTweet = async (req,res)=>{
    const { id } = req.params;
    try{
       const tweet = await Tweet.findById(id)
       if(!tweet){
        return res.status(404).json({error:"No tweet Found"})}
          
         await  Tweet.findByIdAndUpdate(id,{comments: [...tweet.comments,
                {userid:req.user._id,
                userdp:req.body?.dp || null,
                username:req.user.username,
                comment:req.body.comment}]})

        const updatedtweet = await Tweet.findById(id)
        res.status(200).json(updatedtweet)
        }catch(error){
        res.send({error, message:" error in comment request"})
        }  
       
    }

module.exports={
    getTweets,getoneuserTweets,getTweet,
    createTweet,deleteTweet,updateTweet,
    likeTweet,unlikeTweet,commentTweet
}