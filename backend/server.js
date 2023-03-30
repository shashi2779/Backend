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
    // jo hmne email , password login karte wakt frontend(postman) se diya , wahi "data" m aaya
    let { email, password } = data;
    if (email && password) {
      //jo hmne "email" diya tha login k wakt , wo "user" database mai hai toh aaya
      let user = await FooduserModel.findOne({ email: email })
      if (user) {

        if (user.password == password) {

          // token 
          //payload , bydefault - algo [SHA256] , secrets
          // expire date => kab hoga wo add kiya 
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


app.patch("/forgetPassword", async function (req, res) {
  try {
    // req --> email 
    let { email } = req.body;
    // otp expire after five min
    let afterFiveMin = Date.now() + 5 * 60 * 1000;
    let otp = otpGenerator()
    console.log(otp)
    // 1st - search user on the basis of "email"
    // 2nd - send otp to that email
    // 3rd - given permission to "update the value" by "{new:true}"
    // "new" bydefault "false" hota hai , new ko true krr dene se findOneAndUpdate value ko update kar dega
    // otp expire after five min
    let user = await FooduserModel.findOneAndUpdate({ email: email }, { otp: otp, otpExpiry: afterFiveMin }, { new: true });

    console.log(user)

    res.json({
      data: user,
      message: "otp send to your mail"

    })
  } catch (err) {
    res.end(err.message)
  }
})

function otpGenerator() {
  return Math.floor(100000 + Math.random() * 900000);
}

app.patch("/resetPassword", async function (req, res) {
  try {
    let { otp, password, confirmPassword, email } = req.body;
    // search -> get the user 
    let user = await FooduserModel.findOne(email)
    let currentTime = Date.now()

    if (currentTime > user.otpExpiry) { // aapka currentTime otpExpire se jada hai toh aapka token expire ho gya hai
      // otp remove kiye 
      // user.otp = undefined;
      delete user.otp;
      // hmara token expire ho gya toh "undefined" kar diya
      // user.otpExpiry = undefined
      delete user.otpExpiry;
      // save to save this doc in db (jo change hua usko db me save karr liya)
      await user.save()
      console.log(user)

      res.json({
        message: "otp Expired"
      })

    } else {  // agar otp expire nahi huaa hai yoh password,conformPassword update kar do 

      // otp match kiya
      if (user.otp != otp) { // "time" kam hai otp match nhi kiya 
        
        res.json({
          message: "otp does't match"
        })
      } else { // time kam hai "otp" match ho gya toh password , conformPassword update karr diya
        //otp: undefined matlab otp remove ho gayi  
        // 1st --> jisse mai search kar rha hu  ==> otp k base par search karo [in otp] => otp,email k base prr search krr liya [in otpExpire]
        // 2nd --> jo hme update karna hai uss ke ander
        // 3rd --> validator run k liye
        // new bydefault false hota hai , new ko true krr dene se findOneAndUpdate value ko update kar dega
        // eske ander validators chalte nhi , toh true kiya
        user = await FooduserModel.findOneAndUpdate({ otp , email }, { password, confirmPassword }, { runValidators: true, new: true });

        // key delete -> get the document object -> modify that object by removing useless keys
        // otp remove kiye 
        // user.otp = undefined;
        delete user.otp;
        // and otp expire remove kar do 
        // user.otpExpiry = undefined
        delete user.otpExpiry
        // save to save this doc in db (jo change hua usko db me save karr liya)
        await user.save()
        console.log(user)

        res.json({
          data: user,
          message: "user password reset"

        })
      }
    }

  } catch (err) {
    res.end(err.message)
  }
})


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
      console.log("Jwt decrypted", token)
      // user ki Id nikal liye
      let userId = token.data;
      console.log("userId", userId)
      req.userId = userId;

      next();
    } else {
      res.send("you are not logged In kindly Login")
    }

  } catch (err) {
    console.log(err)
    if (err.message == "invalid signature") {
      res.send("Token invalid kindly Login")
    } else {
      res.send(err.message)
    }

  }
}


// profile page
app.get("/user", protectRoute, async function (req, res) {
  // user k profile ka data show kiye
  try {
    const userId = req.userId;
    const user = await FooduserModel.findById(userId);
    res.json({
      data: user,
      message: "Data about logged In user is send"
    })
  } catch (err) {
    res.end(err.message)
  }
})


// user update route
// user delete route


app.listen(3000, function () {
  console.log("server running on 3000 port")
})


