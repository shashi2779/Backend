const express = require("express")

const app = express()

app.get("/simple",function(req,res){
    res.end("simple output")
})

app.get("/simple",function(req,res){
    res.end("simple1 output")
})

app.get("/simple",function(req,res){
    res.end("simple2 output")
})

app.listen(4000,function(){
    console.log("server started at port 4000")
})

