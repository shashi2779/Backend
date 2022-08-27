const express = require("express")

const app = express();

const FooduserModel = require("./userModel")

app.use(express.json())

app.post("/signout", async function(req,res){
  try{
    let data = req.body;
    console.log(data);
 
    // apna jo data postman se aa rha h database se use jodna h
    let newUser = await FooduserModel.create(data)
    console.log(newUser);
    res.end("post wala route se data")
  }catch(err){
    res.end(err.message)
  }
})

app.listen(3000,function(){
    console.log("server running on 3000 port")
})


