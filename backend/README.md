# install

1- npm init -y

2- npm install express

3- npm i -g nodemon
*add "start":"nodemon server.js" to package.json

// if you want to accept data in backend then use it with  "post" route. 

### app.use(express.json())
- if you want to accept data in backend
- req.body me data aaye eske liye  [ app.use(express.json()) ] use kiye apne file m
- esko post route k upar likhana padta h 
- ye line likhane se aapka data put ho jata h


### create server
    //require kiye
    const express = require("express")

    //call kiye
    const app = express();

    //listen kiye
     app.listen(3000,function(req,res){
        console.log("server running on 3000 route id")
    })
### Notes

     Route is a noun
     CRUD is a verb

     - matlab route prr kaun sa kam karna h 

     Route ---> noun
     CRUD  ---> verb

     C - create  --> post --> send krr sakte h
     R - Read --> get --> get krr sakte h
     U - update --> patch --> send
     D - delete -->delete --> send

     
     note - 
          1-koi chij create karna ho toh "post" route lagega
          2-koi chij read karna ho toh "get" route lagega
          3-create k liye post route
          4-read k liye get route


### Notes
      1- post : a> creation
                b> data-submit(data bhejna)
      
      2- postman : a> replacement for frontend 
                   b> backend testing

      3- aapka data jo aata h wo { req.body } k ander 

       - { req.body } se data node(backend) prr print karega , postman(frontend) prr nahi   

      4- res.end("data from server") 

       - { res.end } se data postman(frontend) prr print karega 
       - { res.send } se data postman(frontend) prr print karega 


      5- req.body me data aaye eske liye [ app.use(express.json()); ] use kiye file me
       
       - if you want to accept data in backend
       - esko [ app.use(express.json()); ] post route k upar hi likhana padta h ,
         aur ye line likhane se aapka data put ho jata h

## post route -create data
     
     
     * postman se data bheje
        
     {
        "name":"shashi"
     }

     
     app.post("/sayhello",function(req,res){
        console.log("data->",req.body);
        res.end("post wala hello from server")
     })

    
#### output : 

    backend output (node):
                            data -> undefined

    
    frontend output (postman) :
                                post wala hello from server          
    
    
    
 ###
     req.body me data aaye uske liye [ app.use(express.json()); ] add
      karegen route k upar    

    
    * postman se data bheje
    
     {
        "name":"shashi"
     }


     app.use(express.json());      
      
     app.post("/sayhello",function(req,res){
        console.log("data->",req.body);
        res.end("post wala hello from server")
     })  
     

     
#### output :

     backend output (node):
                            data -> shashi

    
    frontend output (postman) :
                                post wala hello from server               

## codes on create,read,update,delete route

    //require 
    const express = require("express")

    //call 
    const app = express();

    app.get("/sayhello",function(req,res){    // res.end, res.send are same to "print data on frontend"
        //frontend
         res.end("hello from get route")
    })

    app.get("/saybye",function(req,res){
        //frontend
         res.send("bye from get route")
    })

    // NOTE:=> post,patch,delete kuchh jada phark nhi h ek jaise routes h 
    app.post("/sayhello",function(req,res){
        console.log("data",req.body)     // backend prr output
        res.end("hello from post route") // frontend prr output(postman)
    })


    app.patch("/sayhello",function(req,res){
        console.log("data",req.body)     
        res.end("hello from patch route") 
    })

    app.delete("/sayhello",function(req,res){
        console.log("data",req.body)     
        res.end("hello from delete route") 
    })


    //template routes
    app.get("/sayhello/:num",function(req,res){
        console.log("data",req.params.num);
        let n = req.params.num;
        let sq = req.params.num*req.params.num;
        res.end(sq+" ")
    })

    app.get("/sayhello/:num1/:num2",function(req,res){
        console.log("param1 se data",req.params.num1)
        console.log("param2 se data",req.params.num2)
    
        let sq = req.params.num1*req.params.num2;

        res.end(sq+" ") 

    })



    //listen 
    // address of server on given machine
    app.listen(3000,function(req,res){
        console.log("server running on 3000 route id")
    })


# database solution

#### product knowledge
 - user data  -->  store
     
     - name
     - email
     - phoneNumber
     - pic
     - password
     - address

#### Tech knowledge
- Schema -

   - Follow
   - how to create a db --> [link](https://www.youtube.com/watch?v=rPqRyYJmx2g) share  (setup mongoDb atlas)
   - connect to my app --> with mongoose tools
    
    [connect karne k liye ek tools lagane wala h , jiska naam mongoose h (npm i mongoose)]

   - how to create a schema
   - how store values in it  

### create a cluster in mongoDb atlas
[link](https://www.youtube.com/watch?v=rPqRyYJmx2g) setup mongoDb atlas  


## connect mongoDb
    - npm init -y
    - npm i mongoose
    - database ko connect k liye mongoose tools use kate h 
   
==================================== 

    server.js
    -----------

    const express = require("express")

    const app = express();

    const userModel = require("./userModel")

    app.listen(3000,function(){
        console.log("server running on 3000 port")
    })

==============================
    
    userModel.js
    ----------------
    
    
    //mongoose require
    const mongoose = require("mongoose")
    
    //mongoDb atlas se
    //connect karne k liye apne app se link chahiye toh mongoDb atlas par 
      "connect" m ja krr "connect your app" m ja krr link nikal legen
    //link m apna email,password put karna padta h 
    let dblink = "mongodb+srv://yadavshashi:Ief8kvPHtozTckmj@freecluster.bmcxj8d.mongodb.net/?retryWrites=true&w=majority"
    
    // mongoose connect 
    //mongoose.connect() fun ye promise base h
    mongoose.connect(dblink)
    .then(function(){
        console.log("connected")
    }).catch(function(err){
        console.log("error",err)
    })



 #### output

     backend output:

                 server running on 3000 port
                 connected


      



## solution-1   
    
    userModel.js
    ----------------

    const mongoose = require("mongoose")

     
     //mongoDb atlas se link nikale (connect with app)
    let dblink = "mongodb+srv://yadavshashi:Ief8kvPHtozTckmj@freecluster.bmcxj8d.mongodb.net/?retryWrites=true&w=majority"

    mongoose.connect(dblink)
    .then(function(){
        console.log("connected")
    }).catch(function(err){
        console.log("error",err)
    })


    // how to create a schema  
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
        type:Number,
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


    Note: 
        kahi kahi maine "required" nahi kar rkha toh eska matlab wo "entry" na bhi doge na , 
        "user" banate wakt toh bhi kam chal jayega (required de diya toh wo entry jarur deni padegi)

    
    
    let userModel = mongoose.model('foodUserModel',userSchema)
    module.exports = userModel;


===========================================


    server.js
    ---------------

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

====================================

    # POSTMAN SE:
    -----------------------------
    post(route)->localhost/3000/signout
    ------------------------------
    body->raw->Json
    ----------------

    {
     "name":"shashi",
     "password":"abcd",
     "conformPassword":"abcd",
     "email":"abc@gmail.com",
     "phonenumber":6200215488
    }


==================================

    frontend out (postamn):
          
                        post wala route se data
    
    
    Backend output (node):

         server running on 3000 port
         connected
         {
            name:'shashi',
            password:'abcd',
            conformPassword:'abcd',
            email:'abc@gmail.com',
            phonenumber:6200215488
         }

## solution-2

    userModel.js
    -------------

    const mongoose = require("mongoose")

    let dblink = "mongodb+srv://yadavshashi:Ief8kvPHtozTckmj@freecluster.bmcxj8d.mongodb.net/?retryWrites=true&w=majority"

    mongoose.connect(dblink)
    .then(function(){
        console.log("connected")
    }).catch(function(err){
        console.log("error",err)
    })


    // how to create a schema  

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

======================================
    
    server.js
    --------------

    const express = require("express")

    const app = express();

    const userModel = require("./userModel")

    app.use(express.json())

    app.post("/signout", async function(req,res){
       let data = req.body;
       console.log(data);
 
      // apna jo data postman se aa rha h database se usse jodna h
      let newUser = await userModel.create(data)
      console.log(newUser);
      res.end("post wala route se data")
    })

    app.listen(3000,function(){
        console.log("server running on 3000 port")
    })



===================================    

    # POSTMAN SE:
    -----------------------------
    post(route)->localhost/3000/signout
    ------------------------------
    body->raw->Json
    ----------------

    {
     "name":"shashi",
     "password":"abcd",
     "conformPassword":"abcd",
     "email":"abc@gmail.com",
     "phonenumber":6200215488
    }

========================================

    frontend out (postamn):
      
                    post wala route se data


    Backend output (node):

         server running on 3000 port
         connected
         {
            name:'shashi',
            password:'abcd',
            conformPassword:'abcd',
            email:'abc@gmail.com',
            phonenumber:6200215488
         }

         {
            name:'shashi',
            password:'abcd',
            conformPassword:'abcd',
            email:'abc@gmail.com',
            phonenumber:6200215488,
            pic:'shashidp.jpg',
            _id:new objectId("6304c80176c3ac80fce13f96),
            __v:0
         }

         
         
         note:
              jo mongoDb h na har ek ko "unique_id" dega

              _id:new objectId("6304c80176c3ac80fce13f96)
         






   
    