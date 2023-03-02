const express = require('express')
const mongoose = require('mongoose')
require("dotenv").config()
const bodyParser=require('body-parser')
mongoose.set('strictQuery',false)
const cors=require('cors')
app=express()
app.use(cors())
app.get('/',(req,res)=>{
    res.send("eni zedaa")
})

const port=process.env.port
app.listen(port,()=>{
    console.log(`connected at ${port}  `);
})

mongoose.connect(process.env.DATABASE,{useNewUrlParser:true,useUnifiedTopology:true})
.then(() => {
    console.log("db connected");
}).catch(() => {
    console.log("errr");
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//define routes
app.use('/api/user',require('./router/router'))