const express = require("express")

const app = express();

const cookieParser = require("cookie-parser")


// represent -> collection
const FooduserModel = require('./userModel')

// to add post body data to req.body
app.use(express.json())

// call kiye
app.use(cookieParser())

app.post("/signup", async function(req,res){
  try{
    let data = req.body; 
    console.log(data);  // frontend se data aaya
 
    // jo frontend se "data" aaya usse "db" me bhej diya 
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
      console.log(data)
      // jo hmne email , password login karte wakt frontend(postman) se diya , "data" m wahi aaya
      let {email,password} = data; 
      if(email && password){ 
         //jo hmne "email" diya tha login k wakt , wo "user" database mai hai toh aaya
        let user = await FooduserModel.findOne({email : email})
        if(user){
            
          if(user.password == password){
            
            // data bhejte hai 
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


// users -> get all the users ( sare users la kar de deta hai ) -> sensitive route -> protect route -> logged In i will only allow that person
app.get("/users", protectRoute, async function(req,res){
  try{
    let users = await FooduserModel.find();
    //to send json data
    res.json(users)
  }catch(err){
    res.end(err.message);
  }
})


function protectRoute(req,res,next){
  // req.cookie => k ander data aata hai
  console.log(req.cookies)  
  console.log("protect route encountered")
  //you are logged In then it will allow next fun to run
  next();
}

app.listen(3000,function(){
    console.log("server running on 3000 port")
})


