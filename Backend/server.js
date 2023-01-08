require('dotenv').config()
const express = require('express')
const tweetRoutes = require('./routes/tweetRoutes')
const userRoutes = require('./routes/userRoutes')
const mongoose = require ('mongoose')
mongoose.set('strictQuery',false);
//express app
const app =express();

//Middleware
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next()
})

//routes
app.use("/api/tweet",tweetRoutes)
app.use("/api/user",userRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
.then (()=>{
    //listen for requests
    app.listen(process.env.PORT,()=>{
    console.log('Connected and Listening on port 4001')})
})
.catch((err)=>{console.log(err)})


