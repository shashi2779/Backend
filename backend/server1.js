// const express = require("express");

// const app = express();

// app.use(express.json());

// app.use(function(req,res,next){
//     // res.end("msg from use route");
//     console.log("data from user route");
//     next();
// })

// app.post("/sayhello",function(req,res){
//     console.log("data",req.body)    // frontend se data aaya backend prr
//     res.end("post wala hello ")    //  frontend prr print hua
// })

// app.listen(4000,function(){
//     console.log("server running on 4000 port")
// })




const express = require("express")

const app = express()

app.use(function(req,res,next){
    console.log("use will always run")
    next()
})

app.post("/simple",function(req,res){
    res.end("simple post ka output")
})

app.post("/simple",function(req,res){
    res.end("simple1 post ka output")
})


app.listen(4000,function(){
    console.log("server started at port 4000")
})