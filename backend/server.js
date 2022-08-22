
//require kiye
const express = require("express")

//call kiye
const app = express();

app.get("/sayhello",function(req,res){
    res.end("get route se msg")
})


// NOTE:=> post,patch,delete kuchh jada phark nhi h ek jaise routes h 

app.post("/sayhello",function(req,res){
    console.log("data",req.body)     // backend prr output
    res.end("hello from post route") // frontend prr output(postman)
})


app.patch("/sayhello",function(req,res){
    console.log("data",req.body)     
    res.end("hello from update route") 
})

app.delete("/sayhello",function(req,res){
    console.log("data",req.body)     
    res.end("hello from delete route") 
})


//template routes
app.get("/sayhello/:num",function(req,res){
    console.log("data",req.params.num);
    let n = req.params.num;
    let sq = n*n;
    res.end(sq+" ")
})

app.get("/sayhello/:num1/:num2",function(req,res){
    console.log("param1 se data",req.params.num1)
    console.log("param2 se data",req.params.num2)
    
    let sq = req.params.num1*req.params.num2;

    res.end(sq+" ") 

})


//listen kiye
// address of server on given machine
app.listen(3000,function(req,res){
    console.log("server running on 3000 port")
})



