const express = require("express");

const app = express();

app.use(express.json());

app.post("/simple",function bodychecker(req,res,next){
  let data = req.body;
  // obj ki length nikale yha 
  let len = Object.keys(data).length;
  if(len == 0){
    res.end("kindly enter data in the body")
  }else{
    next();
  }
})

app.post("/simple",function(req,res){
    console.log(req.body);
    res.end("post route msg")
})

app.listen(3000,function(){
    console.log("server running on port 3000")
})