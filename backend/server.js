const express = require("express")

const app = express();

const cookieParser = require("cookie-parser")

const secrets = require("./secrets")

var jwt = require('jsonwebtoken');

// represent -> collection
const FooduserModel = require('./userModel')

// to add post body data to req.body
app.use(express.json())

// call kiye
app.use(cookieParser())

app.post("/signup", async function (req, res) {
  try {
    let data = req.body;
    console.log(data);  // frontend se data aaya

    // jo frontend se "data" aaya usse "db" me bhej diya 
    let newUser = await FooduserModel.create(data)
    console.log(newUser);
    res.end("post wala route se data")
  } catch (err) {
    res.end(err.message)
  }
})

app.post("/login", async function (req, res) {
  try {
    let data = req.body;
    console.log(data)
    // jo hmne email , password login karte wakt frontend(postman) se diya , "data" m wahi aaya
    let { email, password } = data;
    if (email && password) {
      //jo hmne "email" diya tha login k wakt , wo "user" database mai hai toh aaya
      let user = await FooduserModel.findOne({ email: email })
      if (user) {

        if (user.password == password) {

          // token 
          //payload , bydefault - algo [SHA256] , secrets
          // expire date add kiye
          const token = jwt.sign({ data: user["_id"], exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) }, secrets.JWTSECRET)

          // token/data bhejte hai <= cookie k ander
          res.cookie("JWT", token)

          res.send("user logged In")
        } else {
          res.send("email or password does't match")
        }

      } else {
        res.end("user with this email Id is not found. kindly sign up")
      }
    } else {
      res.end("kindly enter email & password both")
    }
  } catch (err) {
    res.end(err.message)
  }
})


app.patch("/forgetPassword", async function(req,res){
   try{
     let { email } = req.body;
     let otp = otpGenerator()
     let user = await FooduserModel.findOneAndUpdate({email:email},{otp:otp},{new:true});   
     // new bydefault false hota hai , new ko true krr dene se findOneAndUpdate value ko update kar dega

     console.log(user)

     res.json({
      data:user,
      message:"otp send to your mail"
     
    })
   }catch(err){
    res.end(err.message)
   }
})


app.patch("/resetPassword", async function(req,res){
  try{
    let { otp , password , confirmPassword } = req.body;
     // otp k base par search karo 
     //otp: undefined matlab otp remove ho gayi
     // 1st --> jisse mai search kar rha hu
     // 2nd --> jo hme update karna hai uss ke ander
     // 3rd --> validator run k liye
    let user = await FooduserModel.findOneAndUpdate({otp:otp},{password,confirmPassword,otp:undefined},{runValidators:true},{new:true});   
    // new bydefault false hota hai , new ko true krr dene se findOneAndUpdate value ko update kar dega
    // eske ander validators chalte nhi , toh true kiya
    console.log(user)

    res.json({
     data:user,
     message:"password for the use is reset"
    
   })
  }catch(err){
   res.end(err.message)
  }
})

function otpGenerator(){
  return Math.floor(100000 + Math.random() * 900000);
}



// users -> get all the users ( sare users la kar de deta hai ) -> sensitive route -> protect route -> logged In i will only allow that person
app.get("/users", protectRoute, async function (req, res) {
  try {
    let users = await FooduserModel.find();
    //to send json data
    res.json(users)
  } catch (err) {
    res.end(err.message);
  }
})

function protectRoute(req, res, next) {
  try {
    // req.cookie => k ander data aata hai
    const cookies = req.cookies
    const JWT = cookies.JWT
    if (cookies.JWT) {
      console.log("protect route encountered")
      //you are logged In then it will allow next fun to run
      const token = jwt.verify(JWT, secrets.JWTSECRET)
      console.log("Jwt decrypted",token)
      // user ki Id nikal liye
       let userId = token.data;
       console.log("userId",userId)
       req.userId = userId; 
     
       next();
    } else {
      res.send("you are not logged In kindly Login")
    }

  } catch (err) {
    console.log(err)
    if(err.message == "invalid signature"){
      res.send("Token invalid kindly Login")
    }else{
      res.send(err.message)
    }
    
  }
}


// profile page
app.get("/user", protectRoute, async function(req, res){
    // user k profile ka data show kiye
    try{
       const userId = req.userId;
       const user = await FooduserModel.findById(userId);
       res.json({
        data:user,
        message:"Data about logged In user is send"
       })
    }catch(err){
      res.end(err.message)
    }
})





app.listen(3000, function () {
  console.log("server running on 3000 port")
})


