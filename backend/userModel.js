const mongoose = require("mongoose")

let dblink = "mongodb+srv://yadavshashi:Ief8kvPHtozTckmj@freecluster.bmcxj8d.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(dblink)
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
    required:true
  },
   password:{
    type:String,
    required:true
  },
  conformPassword:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  phonenumber:{
    type:"String",
    minLength:10,
    maxLength:10
  },
  pic:{
    type:String,
    default:"shashidp.jpg"
  },
  address:{
    type:String
  }
})


let userModel = mongoose.model('foodUserModel',userSchema)
module.exports = userModel;