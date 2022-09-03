const express = require("express")

const app = express();

const FooduserModel = require("./userModel")

app.use(express.json())

app.post("/signup", async function(req,res){
  try{
    let data = req.body;
    console.log(data);
 
    // apna jo data postman se aa rha h database se usse jodna h
    let newUser = await FooduserModel.create(data)
    console.log(newUser);
    res.end("post wala route se data")
  }catch(err){
    res.end(err.message)
  }
})

app.post("/login",async function(req,res){
   try{
      let data = req.body;
      // jo hmne email , password login karte wakt frontend se diya ,  "data" m wahi aaya
      let {email,password} = data; 
      if(email){ 
         //jo hmne email diya tha login k wakt , wo "user" database mai hai toh aaya
        let user = await FooduserModel.findOne({email : email})
        if(user){
            
          if(user.password == password){
               res.cookie("token","sample value")
               res.send("user logged In")
            }else{
              res.send("email or password does't match")
            }
        }else{
          res.end("user with this email Id is not found. kindly sign up")
        }
      }else{
        res.end("kindly enter email & password both")
      }
   }catch(err){
       res.end(err.message)
   }
})


// users -> get all the users -> sensitive route -> protect route -> logged In i will only allow that person
app.get("/users",protectRoute,async function(req,res){
  try{
    let users = await FooduserModel.find();
    //to send json data
    res.json(users)
  }catch(err){
    res.end(err.message);
  }
})


function protectRoute(req,res,next){
  console.log("protect route encountered")
  //you are logged In then it will allow next fun to run
  next();
}

app.listen(3000,function(){
    console.log("server running on 3000 port")
})


