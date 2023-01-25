require('dotenv').config()
const express = require('express')
const tweetRoutes = require('./routes/tweetRoutes')
const userRoutes = require('./routes/userRoutes')
const mongoose = require ('mongoose')
mongoose.set('strictQuery',false);
const cors = require('cors')
//express app
const app = express();

//cors
app.use(cors({
    origin:"*",
    methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials:true, //allow session cookie from browser to pass through
}))

//Middleware
app.use(express.json())
app.use(express.static('Public'))
app.use(express.urlencoded({extended:true}))
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


