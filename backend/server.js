const express = require("express")

const app = express();

const userModel = require("./userModel")

app.use(express.json())

app.post("/signout",function(req,res){
  let data = req.body;
  console.log(data);
  res.end("post wala route se data")
})

app.listen(3000,function(){
    console.log("server running on 3000 port")
})


