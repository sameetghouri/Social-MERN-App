require('dotenv').config()
const express = require('express')
const TweetRoutes = require('./routes/TweetRoutes')
const userRoutes = require('./routes/userRoutes')
const mongoose = require ('mongoose')

//express app
const app =express();

//Middleware
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next()
})

//routes
app.use("/api/tweet",workoutRoutes)
app.use("/api/user",userRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
.then (()=>{
    //listen for requests
    app.listen(process.env.PORT,()=>{
    console.log('Connected and Listening on port 4000')})
})
.catch((err)=>{console.log(err)})


