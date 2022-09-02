# install

1- npm init -y

2- npm install express

3- npm i -g nodemon (bar bar server ko run na karna pade)

    -> add  "start":"nodemon server.js" 
       to package.json 
 
     -> npm start (run for you application)

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

## lec-2
* What is an API --> Backend API = ?
* Express :
    * routes ka order --> IMP
    * why Express is a middleware = ?
* Database --> mongoDb --> setup   

### eg-1

    
    
    const express = require("express");
    
    const app = express();
    
    app.use(express.json());    // predefined middleware
    
    app.post("/sayhello",function(req,res){
      console.log("data->",req.body);
      res.end("post wala hello");
    })
    
    app.listen(3000,function(){
      console.log("server started at port 3000")
    })

----------------------------------------    
    
    * postman se data bheje
        
     {
        "name":"shashi"
     }


--------------------------------
     Frontend(postman):

          post wala hello

     
     
     Backend(node):

         server started at port 3000
         shashi     


- Note :
      
       middleware ka order matter karta h 

### eg-2

      use - if any request enters then it will execute , it's function.

     app.use() :
                - koi bhi request aayi ho "i will always run"
                
                - router k req par bhi depends nahi karta ..(post,get) 
                  request koi bhi aayi ho ye chalega hi chalega
      


      const express = require("express");

      const app = express();

      app.use(express.json());

      app.use(function(req,res){
        res.end("i will always run");
      })

      app.post("/sayhello",function(req,res){
        console.log("data->",req.body);
      })

      app.listen(3000,function(){
        console.log("server running on port 3000")
      })


=================================================     

* postman se 

-------------------
       
        get->localhost:3000/sayhello
        -------------------------------


        Frontend output:

                        i will always run
        
        
    


* postman se 
  -------------------
        post->localhost:3000/sayhello
        -------------------------------

         
        Frontend output:

                        i will always run

* postman se 
  -------------------
        get->localhost:3000/
        -------------------------------

         
        Frontend output:

                        i will always run


                  
                  

# database handle

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


### lec-4    mongoose (schema) - getting started 

     # topics:
        * mongoDb
        * mongoDb atlas [db server]
        * collection & documents = ?
        * mongoose
        * schema & model = ?
            - majorly used dataType



===================================================================     

    - server.js
    ==================
    
    const express = require("express")

    const app = express();

    const userModel = require("./userModel")

    app.use(express.json())

    app.post("/signup", async function(req,res){
      try{
            let data = req.body;
            console.log(data);
        
            let newUser = await userModel.create(data)
            console.log(newUser);
            res.end("post wala route se data")
          }catch(err){
                res.end(err.message)
           }
    })

    app.listen(3000,function(){
        console.log("server running on 3000 port")
    })




=================================================================

    
    Note :- 
          [ let newUser = await userModel.create(data) ]

         * await kyun lga h = ?

          bcz express ka server hai wo alag jagah par hai ,
          aur jo mongoDb ka server hai wo mongoDb atlas k upar h ,
          toh ye create ki call async hoti h esliye hmne await lga diya 
          ( promised based h )
          bcz database m gaye create karega time lagega
          toh database ki jitni bi call hoti h async hoti h

          - koi bhi data ko aane me ya create hone me time lag rha 
            (promise based h )
            toh async,await lga degen


          - try,catch
            
            maine request mari response aaya hi nhi code phat sa gya 
            toh aap client ko batate ho na kya error hai ,
            toh hme yha prr try,catch se handle karna chahiye 




=========================================================
    
    
    
    - userModel.js [how to write schema]
    =========================================

    const mongoose = require("mongoose")


    //db server se connect --> mongoDb atlas se connect
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
      address:{
        type:String
      }
    })



    //model is similar to your collection
    //1st- name of collection - fooduserModel
    //2nd- the set of rules this collection should follow (schema k set of rules apply hogen) - userSchema 
    let userModel = mongoose.model('foodUserModel',userSchema)
    module.exports = userModel;


### lec - 5  Login , signup , JSON web token (JWT) , protect route , cookies

    Login :
            [email,password]
               |
               * on the basis of email (check kiye)
                       |
                       * USER mila 
                          |
                          * password compair kiye
                                 1> login
                                 2> wrong email or password



    
    
    app.post("/login",async function(req,res){
      try{
          let data = req.body;
          // jo hmne email , password login karte wakt frontend se diya , "data" m wahi aaya
          let {email,password} = data; 
          if(email){ 
            //jo hmne email diya tha login k wakt , wo "user" database mai hai toh aaya
            let user = await FooduserModel.findOne({email : email})
            if(user){
                
              if(user.password == password){
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


* Mongoose Queries

    * Model.deleteMany()
    * Model.deleteOne()
    * Model.find()
    * Model.findById()
    * Model.findByIdAndDelete()
    * Model.findByIdAndUpdate()
    * Model.findOne()
    * Model.findOneAndDelete()
    * Model.findOneAndReplace()
    * Model.findOneAndUpdate()
    * Model.updateMany()

======================================

* delete - 
    * delete your document

* find -
   *  search karega - return document

* replace -
    * replace whole document

* update -
   * properties update          
         

===================================================


* byId -
   * search on the basis of that id

* One -
   * input - give one or more properties
   * do the task for first matching document

* Many - 
   * input - give one or more properties
   * do the task for all matching entries(sabko)    


==================================================   


## Get all the users

     
    // users -> get all the users -> sensitive route -> protect route -> logged In i will only allow that person
    app.get("/users",async function(req,res){
      try{
        let users = await FooduserModel.find();
        //to send json data
        res.json(users)
      }catch(err){
        res.end(err.message);
      }
    })

========================================================

    output :
             Jitne sare users hai , aa gye sare k sare

    
    
    [ 
        {
            "_id": "6304c80176c3ac80fce13f96",
            "name": "shashi",
            "password": "abcd",
            "conformPassword": "abcd",
            "email": "abc@gmail.com",
            "phonenumber": "6200215488",
            "pic": "shashidp.jpg",
            "__v": 0
        },
        {
            "_id": "6309f28d9945c299d0e30384",
            "name": "shashi",
            "password": "abcd",
            "conformPassword": "abcd",
            "email": "abd@gmail.com",
            "phonenumber": "6200215488",
            "pic": "shashidp.jpg",
            "__v": 0
        },
        {
            "_id": "6309f9bc7b86fb66df9705e8",
            "name": "shashi",
            "password": "abcd",
            "conformPassword": "abcd",
            "email": "add@gmail.com",
            "phonenumber": "6200215488",
            "pic": "shashidp.jpg",
            "__v": 0
        }
    ]
        


#### mai chahta hu banda ek bar login kare uske bad   jitni bar marji kare users(route) prr jana chahe chala jaye.[login na mange token se ho jaye]

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


    
   
    Note :
           protectRoute middleware ki tarah kam krr rha h 
           [ protectRoute m ye code likhegen ki agar aap logged In 
           ho toh mai "next" wale prr jane du.
           agar logged In nahi ho toh mai na jane du. ] 


    
--------------------------------------------------------------    
    
    
    output:

          
           frontend:  (sare users aa gaye)

                  [
                    {
                        "_id": "6304c80176c3ac80fce13f96",
                        "name": "shashi",
                        "password": "abcd",
                        "conformPassword": "abcd",
                        "email": "abc@gmail.com",
                        "phonenumber": "6200215488",
                        "pic": "shashidp.jpg",
                        "__v": 0
                    },
                    {
                        "_id": "6309f28d9945c299d0e30384",
                        "name": "shashi",
                        "password": "abcd",
                        "conformPassword": "abcd",
                        "email": "abd@gmail.com",
                        "phonenumber": "6200215488",
                        "pic": "shashidp.jpg",
                        "__v": 0
                    },
                    {
                        "_id": "6309f9bc7b86fb66df9705e8",
                        "name": "shashi",
                        "password": "abcd",
                        "conformPassword": "abcd",
                        "email": "add@gmail.com",
                        "phonenumber": "6200215488",
                        "pic": "shashidp.jpg",
                        "__v": 0
                    }
                ]




         
         backend:

                 server running on 3000 port
                 connected
                 protect route encountered
      

![CHEESE!](image/users-1.jpg)

![CHEESE!](image/users-2.jpg)

![CHEESE!](image/users-3.jpg)
    