const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

//==============keys=============//
const dburl = process.env.DBURL || "mongodb://localhost:27017/policedatabase"
const port = process.env.PORT || 1020
const server = express()
//==============end==============//

//============custom route============//
const customRoute = require("./customRoutes")
//============------------============//

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: false}))
server.use(cors()) 

mongoose.connect(dburl,{useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true})
.then(()=>{
    console.log("database connected")
})
.catch(err=>{ 
    console.log(`database couldn't connect`, `error: ${err}`)
})

server.use("/api", customRoute)


server.listen(port,()=>{
    console.log(`server running on port: ${port}`)
})