// represent -> collection
const FooduserModel = require('../model/userModel')
var jwt = require('jsonwebtoken');
const secrets = require("../secrets")
const mailSender = require("../nodemailer/mailSender")

// *************************controller function**********************

  async function signupController(req, res) {
    try {
      let data = req.body;
      console.log(data);  // frontend se data aaya
  
      // jo frontend se "data" aaya usse "db" me bhej diya 
      let newUser = await FooduserModel.create(data)
      console.log(newUser);
      res.status(201).json({
        result :"user signed up"
      })
    } catch (err) {
        //server crashed 
        res.status(400).json({
          result: err.message
        })
    }
  }

  
  async function loginController(req, res) {
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
           
            // user login hua hai use "save" karna hai , without password and conform password
             user.password = undefined
             user.conformPassword = undefined
            // before sending to frontend , remove password & conform password
            console.log(user)
            res.status(200).json({
              user
            })

          } else {
            // email or password missmatch
            res.status(400).json({
              result : "email or password does't match"
            })
          }
  
        } else {
          //user not found
          res.status(404).json({
            result :"user not found"
          })
        }
      } else {
        //something is missing
        res.status(400).json({
          result:"user not found kindly signup"
        })
      }
    } catch (err) {
      //server crashed 
      res.status(500).json({
        result: err.message
      })
    }
  }
  
  async function forgetPasswordController(req, res) {
    try {
        let { email } = req.body;
        //    mail
        // by default -> FindAndUpdate -> not updated send document, 
        // new =true -> you will get updated doc
        // email -> do we have a user -> no user 
        // update
        let user = await FooduserModel.findOne({ email });
        if (user) {
            let otp = otpGenerator();
            let afterFiveMin = Date.now() + 5 * 60 * 1000;
            
            await mailSender(email, otp);
            
            user.otp = otp;
            user.otpExpiry = afterFiveMin;
            await user.save();
            
            res.status(204).json({
                data: user,
                result: "Otp send to your mail"
            })
        
          } else {
            res.status(404).json({
                result: "user with this email not found"
            })
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
}
  
  async function resetPasswordController(req, res) {
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
  }
  
  
  
  //********************helper function**********************
  
  function otpGenerator() {
    return Math.floor(100000 + Math.random() * 900000);
  }
  
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



module.exports = {
    signupController,
    loginController,
    forgetPasswordController,
    resetPasswordController,
    protectRoute
}