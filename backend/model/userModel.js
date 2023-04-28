const mongoose = require("mongoose")


//db server se connect --> mongoDb atlas se connect
let secrets = require("../secrets")


mongoose.connect(secrets.DB_LINK)
.then(function(){
    console.log("connected")
}).catch(function(err){
    console.log("error",err)
})


// how to create a schema  
// kahi kahi maine "required" nahi kar rkha toh eska matlab wo "entry" na bhi doge na , 
// "user" banate wakt toh bhi kam chal jayega (required de diya toh wo entry jarur deni padegi)
let userSchema = new mongoose.Schema({
  name:{
    type: String,
    required:[true,"Name is not send"]
  },
   password:{
    type:String,
    required:[true,"password is missing"]
  },
  conformPassword:{
    type:String,
    required:[true,"conformPassword is missing"],
    //custom validator
    validate:{
       validator:function(){
          // "this" referes to the current entry
          return this.password == this.conformPassword
       },
       //error message
       message:"password is miss match"
    }
  },
  email:{
    type:String,
    required:[true,"email is missing"],
    unique:true
  },
  phonenumber:{
    type:"String",
    minLength:[10,"less than 10 number"],
    maxLength:10
  },
  pic:{
    type:String,
    default:"shashidp.jpg"
  },
  days:{
    type:String,
    enum:["mon","tue","wed"]
  },
  otp :{
    type:String
  },
  otpExpiry:{
    type : Date
  },
  address:{
    type:String
  }
})



//model is similar to your collection
//1st- name of collection(data base ka nam) - fooduserModel
//2nd- the set of rules this collection should follow (schema k set of rules apply hogen) - userSchema 
let FooduserModel = mongoose.model('foodUserModel',userSchema)
module.exports = FooduserModel;