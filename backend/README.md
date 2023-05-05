# Backend :
- Express.js -> Rest Api
- postman -> replacement for frontend 
- DB -> mongoDB,sql
- Authentication and Authorization
- Creadit card payment 
- Email -> nodemailer
- Backend security and scalability
- socket.io

# install

1- npm init -y

2- npm install express

3- npm i -g nodemon (bar bar server.js ko run na karna pade)

    -> add  "start":"nodemon server.js" 
       to package.json 
 
     -> npm start (ye command chalane se server.js apne se run hota rehega)

- if you want to accept data in backend then use it with  "post" route. 

### app.use(express.json())
- if you want to accept data in backend
- req.body me data aaye eske liye  [ app.use(express.json()) ] use kiye apne file m
- esko "post" route k upar likhana padta h 
- ye line likhane se aapka data put ho jata h


### create server
```js
   // npm init -y
   // npm i express
   // require -> call -> listen 

    //require kiye
    const express = require("express")

    //call kiye
    const app = express();

    //listen kiye
     app.listen(3000,function(req,res){
        console.log("server running on 3000 port")
    })
```    
### CRUD Notes

     Route is a noun
     CRUD is a verb

     - matlab route prr kaun sa kam karna h 

     Route ---> noun
     CRUD  ---> verb

     C - create  --> post --> send krr sakte h
     R - Read --> get --> get krr sakte h
     U - update --> patch --> send
     D - delete --> delete --> send

     
     note - 
          1-koi chij "create" karna ho toh "post" route lagega
          2-koi chij "read" karna ho toh "get" route lagega
          
          - create k liye "post" route
          - read k liye "get" route


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

## post route - create data
     
     
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

## codes on CRUD

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
   
   * API : logic of the backend
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
            (koi bhi request aaye pahle "use" wala route chalega)

     app.use() :
                - koi bhi request aayi ho "i will always run"
                
                - app.use() me "res.end" or "res.send" se data frontend prr hi print hoga.
                - app.use() me "console.log()" or "req.body" se data backend prr print hoga
  
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

   

#### postman se - (get route) :

-------------------
       
        get->localhost:3000/sayhello
        -------------------------------


        Frontend output:

                        i will always run
        
        
    


#### postman se - (post route)
  -------------------
        post->localhost:3000/sayhello
        -------------------------------

         
        Frontend output:

                        i will always run

#### postman se 
  -------------------
        get->localhost:3000/
        -------------------------------

         
        Frontend output:

                        i will always run


### eg-3

    const express = require("express")
    
    const app = express();
    
    app.use(express.json());            //predefined middleware

    app.use(function(req,res,next){    // user define middle ware
      console.log("i will always ran")
      next();
    })

    app.post("/sayhello",function(req,res){
      console.log("data->",req.body);
      res.end("post wala hello")
    })

    app.listen(3000,function(){
      console.log("server started at port 3000")
    })

#### postman se data bheje
    ---------------------------------------------
    post->localhost:3000/sayhello
    --------------------------------
        
     {
        "name":"shashi"
     }


-------------------------------------------------------
     
     #output:

     Frontend output[postman]:

                              post wala hello


     Backend output[node]: ( "console.log" wala backend prr hi print hota hai)
                          
                             i will always run
                             data-> {name:"shashi"}
                               

### Note : imp
    
      1=> app.use(express.json())
          ==========================
       <a>
       app.use kyun likha h = ?
       bcz kabhi bhi koi banda mujhe data bhej sakta h. toh "app.use" 
       toh hmesha chalega . jo data aaya hai req.body me put krr diye.
       
       <b>
       "express.json()" is inbuilt middleware & this fun made by us.

       
       
       
       2=> userdefined middleware
          =========================
       <a> 
         agar aapne "userdefined middleware" khud banaya hai , 
         toh next() call krna pdega.

              app.use(function(req,res,next){
                console.log("i will always run");
                next();
              })

         
         <b>  use -
                   if any request enters then it will execute  , it's function.

         <c> next() -
                    next kya karta h = ?

                    - apne se agale wale route/fun hai uss prr bhej deta hai
                    
                    - next nahi likhe toh wahi prr rook jata hai


             
        
        3=> get/post/delete
            ==================
             i request method matches , 
             then route will be matches.

         4=> req.end() / req.send()
             ========================
             
             jaise response frontend prr gya , backend ka kam khatam ho jata hai,
             jab tak response nahi gya tab tak ye niche-2 travel karta rahega .

                   res.end("") 
                   res.send("")

             - jaise hi aapne res.end() krr diya aapni kahani khatam 
             - res.end msg bhej diya frontend prr 


           5=> In express
               ============

               code execution start when request is send---> serially (top to bottom)

               after response you can not send anythings to frontend

                  
### In Express :
- code execution start when request is send---> serially (top to bottom) 
  
  after response you can not send anythings to frontend

#### aap k pas teen "get" hai , teeno same hai
- chal kaun sa rha = ?  
    
    - response dete hi aapka code rook jayega ( first wala hi chala )
    - after response you can not send anythings to frontend
##### case : 1
```js

const express = require("express")

const app = express()

app.get("/simple",function(req,res){
    res.end("simple output")
})

app.get("/simple",function(req,res){
    res.end("simple1 output")
})

app.get("/simple",function(req,res){
    res.end("simple2 output")
})

app.listen(4000,function(){
    console.log("server started at port 4000")
})

```
##### output :
```js
simple output

```
------------------
```js

const express = require("express")

const app = express()


app.get("/simple",function(req,res){
    res.end("simple1 output")
})

app.get("/simple",function(req,res){
    res.end("simple output")
})

app.get("/simple",function(req,res){
    res.end("simple2 output")
})

app.listen(4000,function(){
    console.log("server started at port 4000")
})

```
##### output :
```js
simple1 output

```

        
##### case : 2  
- as soon as "res.end" line is executed there is not further execution of lower handler function.
- when a request is send then it will execute all the route handlers serially. 
- order me chalta hai 
- order me chalte huye "response" aa gya toh agalo ki bari hi nhi aati
  
```js

const express = require("express")

const app = express()

app.get("/simple",function(req,res){
    res.end("simple get ka output")
})

app.post("/simple",function(req,res){
    res.end("simple post ka output")
})

app.patch("/simple",function(req,res){
    res.end("simple patch ka output")
})

app.delete("/simple",function(req,res){
    res.end("simple delete ka output")
})

app.use(function(req,res){
    res.end("use will always run")
})

app.listen(4000,function(){
    console.log("server started at port 4000")
})

```
##### output :
```js
simple get ka output

```
--------------------  

```js

const express = require("express")

const app = express()

app.use(function(req,res){
    res.end("use will always run")
})

app.get("/simple",function(req,res){
    res.end("simple get ka output")
})

app.post("/simple",function(req,res){
    res.end("simple post ka output")
})

app.patch("/simple",function(req,res){
    res.end("simple patch ka output")
})

app.delete("/simple",function(req,res){
    res.end("simple delete ka output")
})

app.listen(4000,function(){
    console.log("server started at port 4000")
})

```
##### output :
```js
use will always run

```
----------------------

```js

const express = require("express")

const app = express()


app.post("/simple",function(req,res){
    res.end("simple post ka output")
})

app.use(function(req,res){
    res.end("use will always run")
})

app.get("/simple",function(req,res){
    res.end("simple get ka output")
})

app.patch("/simple",function(req,res){
    res.end("simple patch ka output")
})

app.delete("/simple",function(req,res){
    res.end("simple delete ka output")
})

app.listen(4000,function(){
    console.log("server started at port 4000")
})

```
##### output :
```js
simple post ka output

```

##### hmm chahte hai "app.use" k bad "app.post" chal jaye , toh yha "next" aayega

```js

const express = require("express")

const app = express()

app.use(function(req,res,next){
    console.log("use will always run")
    next()
})

app.post("/simple",function(req,res){
    res.end("simple post ka output")
})

app.post("/simple",function(req,res){
    res.end("simple1 post ka output")
})


app.listen(4000,function(){
    console.log("server started at port 4000")
})

```
##### output :
```js
// agar "console.log" se na print krr k "res.end" se print karate toh "app.use" wala hi bas frontend prr print hota "app.post" wala nhi hota
Backend(node)     : use will always run      


Frontend(postman) :   simple post ka output

```

### Eg.
- yha hamne fun banaya "bodychecker" eska work hai - data aa rakha hai toh thik next route prr bhej do, 
 
    agar data nhi aaya toh wapas bhej do.
    
```js
const express = require("express");

const app = express();

app.use(express.json());

app.post("/simple",function bodychecker(req,res,next){
  let data = req.body;
  // obj ki length nikale yha 
  let len = Object.keys(data).length;
  if(len == 0){
    res.end("kindly enter data in the body")
  }else{
    next();
  }
})

app.post("/simple",function(req,res){
    console.log(req.body);
    res.end("post route msg")
})

app.listen(3000,function(){
    console.log("server running on port 3000")
})

```
##### output:
```js
- agar postman se data pas nhi kiya toh :
    
    output:  kindly enter data in the body



- agar postman se data pas kiya toh :
 postman: {
          "name":"shashi"
          }

frontEnd output: post route msg
backend output : shashi

```

### middleware :
- fun that can modify req/res cycle are known as middleware
- backend <------req----- frontend
- "/user" <--- "/isAuthorized" <--- "/isLogin" <--- "/bodyChecker" <------req-------- frontend
- jo bhi fun aapke req/res cycle ko change kar sakte hai unhe "middleware" kahte hai

--------------------

## lec - 3
## database handle

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
   - how to create a db --> [link](https://www.youtube.com/watch?v=rPqRyYJmx2g) share  (setup mongoDb atlas) , then
       
        - 1st step - database access --> add new "database user" --> yha se password bhi aa jayega (dblink me jo pass dal rhe uske liye)
        - 2nd step - network access --> add IP address --> access List entry [0.0.0.0] --> "allow access from anyware"
        - 3rd step - atlas --> connect --> connect your application --> dblink 
   - connect to my app --> with mongoose tools
          
          - mongoose lib use kiye connect karne k liye
          - [connect karne k liye ek tools lagane wale h , jiska naam mongoose h (npm i mongoose)]
          - npm i mongoose
          - const mongoose = require("mongoose")
          - mongoose.connect(dblink) 
    

   - how to create a schema :=> search mongoose schema type
         
         - let userSchema = new mongoose.Schema({})
         - let FooduserModel = mongoose.model('foodUserModel',userSchema)
         - module.exports = FooduserModel;
   - how store values in it  
       
          

### create a cluster in mongoDb atlas
[link](https://www.youtube.com/watch?v=rPqRyYJmx2g) setup mongoDb atlas  


## connect mongoDb
    - npm init -y
    - npm i mongoose
    - database ko connect k liye "mongoose" tools use kate h 
   
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
    //mongoose.connect() --> fun ye promise base h
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
       console.log(data);   // frontend se data aaya [ postman se ]
 
      // jo frontend se "data" aaya usse "db" me bhej diya 
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


### lec-4    mongoose (schema) :
- mongoose validation library npm
- validator.js  (mongoose validation library npm) - bitcoin k liye bhi use kar sakte hai ese
- mongoose doc : search on google

     # topics:
        * mongoDb
        * mongoDb atlas [db server]
        * collection & documents = ?
        * mongoose
        * schema & model = ?
            - majorly used dataType
        * login
        * signup

| sql | nosql |
| --- | --- |
| data represent -> table,row,column | data represent -> collection-> obj form|
| relational database | very less relational are involved |
| structured data | un-structured data|


### Model :
- create a collection using some set of rules.
- a collection in which document can be CRUD on the basis of some rules[schema].
- rules hi Schema kahlate hai.
### collection :
- set of documents that are CRUD without any rules.
- aap kuchh bhi put karr sakte ho ek collection ke ander 
### Schema :
- set of rules that a particular document should follow inorder to be CRUD in a collection(Model)
- Schema k ander kya hote hai : 
    
    - datatypes , 
       - string
       - number
       - date
       - buffer
       - boolean
       - objID   - _id
       - array
       - decimal128 - float
       - map        - obj
       - schema     - inheritance

    - validators
      - 1 :
        -  required : true ,
        - unique
        - default
        - string k sath - enum , min length , max length
        - number k sath - min , max
        - enum : ["mon","tue","wed"] => day k ander mon,tue,wed k alawa kuchh aur huaa toh "error" de dega
      - 2 :
        - error message
             - required : [true,"name is not send"]
             - minLength : [10,less than 10 numbers]
      - 3:       
        - custom validators :
              
                validate:{
                     
                     validator: fun(){..........},
                     message:____
                
                }



===================================================================  
## signup : user signup kiya
```js
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

```


=================================================================

    
    Note :- 
          [ let newUser = await userModel.create(data) ]

         * await kyun lga h = ?

          bcz express ka server hai wo alag jagah par hai ,
          aur jo mongoDb ka server hai wo mongoDb atlas k upar h ,
          [toh ye create ki call async hoti h esliye hmne await lga diya 
          ( promised based h )]
          bcz database m gaye create karega time lagega,toh async-await use krr liya,
          database ki jitni bi call hoti h async hoti h

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
        enum:["mon","tue","wed"] //day k ander [mon,tue,wed] k alawa kuchh aur huaa toh "error" de dega
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
               * on the basis of email,password (check kiye)
                       |
                       * USER nikale {on the basis of email }
                          |
                          * phir uss user ka password compair kiye
                                 1> login
                                 2> wrong email or password



  ## login : user login kiya
  ```js  
    // represent -> collection
    const FooduserModel = require("./userModel")


    app.post("/login",async function(req,res){
      try{
          let data = req.body;
          // jo hmne email , password login karte wakt frontend se diya , "data" m wahi aaya
          let {email,password} = data; 
          if(email && password){ 
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
```

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


# cookies+JWT 

## cookie

 ![CHEESE!](image/users-4.jpg)

- cookie se data bhej rhe =>  jab aap email , password put karte ho login k samay toh uske response me "res+token" bhi bhejte  hai

   toh aapke pas ek function hota hai , jisme aap data bhejte ho "res.cookie()"

   jaise aap kuchh bhi bhejte ho key:value pair me data bhej pao

    res.cookie("token","sample value");

# 
      

    app.post("/login",async function(req,res){
      try{
          let data = req.body;
          // jo hmne email , password login karte wakt frontend se diya ,  "data" m wahi aaya
          let {email,password} = data; 
          if(email && password){ 
            //jo hmne email diya tha login k wakt , wo "user" database mai hai toh aaya
            let user = await FooduserModel.findOne({email : email})
            if(user){
                
              if(user.password == password){
                  //cookie bheje h
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
        

- cookie ka data dikha rhe => aapke pas ek function hota hai , jab banda req marta h ,toh "req.cookie" k ander data aata hai 

   cookie lene/dikhane k liye ek module hota h ,that is "cookie-parser" toh esko pahle install kiye ,phir require kiye , phir call kiye.

   install - npm i cookie-parser

   
   require - const cookieParser = require("cookie-parser");

   
   call kiye - app.use(cookieParser())

   console.log(req.cookie)

  #

      
      // npm i cookie-parser
      //const cookieParser = require("cookie-Parser");
      //app.use(cookieParser())

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
        //cookie milega
        console.log(req.cookies)            // req.cookie k ander data aaya 
        console.log("protect route encountered")
        //you are logged In then it will allow next fun to run
        next();
      }

--------------------------------------------------------------

      #output

      backend output :
                     
                      server running on 3000 port
                      connected                 - db mongoose se
                      {token : 'sample value'}    - "/login" route k "res.cookie()" se jo data bheja gya tha "req.cookie" me aaya 
                      protect route encountered



 ![CHEESE!](image/users-4.jpg)

- cookies bhejegen  (data bhejte hai)
   
   - res.cookie()  

- cookies milega  (data aata hai)

   - req.cookies

 - cookie lene/dikhane k liye => [data aata hai] => esko dikhane k liye "install" , "require" , "call" karegen cookie-parser ko

   - npm i cookie-parser
   - const cookieParser = require("cookie-parser")
   - app.use(cookieParser())
   - console.log(req.cookies)

- initially server cookie bhejta h phir jo bhi client request marega sath me cookie le krr aayega.  



## JWT (json web token) 

![CHEESE!](image/users-5.jpg)

- if verify that if your current user is already logged In or not.

- cookie k ander hi bhejna hai JWT ko

- Secret : only server know this secret

- plain text

    - _id
    - normal text - sab padh sakte h
    - esko bolte h payload 
    - use :
       - kuchh data bhejna hai , jo hamare kam ka ho

- signature : me 3 cheeje hoti h 
   
   - encrypted text that is formed using 
      
      (encrypted text - ye text hi hai esse koi bhi change karr sakta hai)
     - payload 
     - encryption algorithm 
     - secret
   
   - token hai jo na payload , algorithm & signature ka part hota hai , sabse important signature hota h 

   - ess algorithm ki help se esko encrypt karr diya jata hai

   - ye sab mill krr token banta hai , aap ye teeno me se ek cheej nahi bhejte , aap bhejte h token .

   - plain text ( _id ) ->-> payload

![CHEESE!](image/users-6.jpg)

- eg
  
  - cocacola :
     
     - water , soda , sugar ye sab sabke pas hai , prr secret unko hi pta hai 

     - mtlb aap bina ess secret k aap ess signature ko kabi bhi decrept nahi krr sakte 

![CHEESE!](image/users-6.jpg)
      
      - esi tarah har bande ko pta hai payload kya hai , har bande ko pta hai algorithm kaun sa use hua h , but uske pas ek missing
      piece hai , that is secret wo kisi ko pta nahi hai , only server know this secret.

##

![CHEESE!](image/users-7.jpg) 

- same id , same algorithms & same secret se "same hi signature banna chahiye ". 

- given by client jo token(signature) aur jo new signature bna , dono match karte hai eska matlab yahi hua , yah wahi token haii jo aapne kabhi bheja tha . 

##### JWT purpose

 - it verify that if your current user is already loggedIn or not

      [mtlab dubara aane prr login Id & password share na karna pade]

 - cookie k ander JWT hota hai 
 - cookie k ander token bhej dete hai
 - that our token is not tempered
   
    [ agar token change nahi hua toh matlab user wahi hai ]     

-   JWT work

![CHEESE!](image/users-4.jpg) 

- login dubara na karna pade  , eske liye cookie k ander token bhej dete hai 

  [login hone ka token mil jata hai]

  abb wo banda dubara aata hai toh browser apne aap khud token le krr aata hai , apne aap khud token le krr aata hai 

  [mtlab req k sath cookie le krr jata hai , cookie me token hota hai ]

  jo ess cookie k sath token hota hai , uska naam Json web token hai .

- mai chahta hun jo banda pahle se logged In hai wahi access krr paye toh "/users" route me middleware lga diya protectRoute

  protectRoute pahle se logged In bande ko access karne dega ya valid karega

- "/login" route se bhejte hai cookie ko aur varify karne k liye protectRoute middleware 
"/users" route prr lga dete hai , ki jo pahle se logged In hai , usi ko access de

- "/login"   ->->  JWT.sign()
- "/users"   ->->  JWT.verify()



## lec - 6 
#### jwt npm 
#### token == jwt , ko cookie k ander bhejte hai 
- npm install jsonwebtoken
- var jwt = require('jsonwebtoken');
- jwt.sign() --> "/login" me
- jwt.verify() --> "/users" me 
- jwt.sign() se "token" nikal kar "cookie" k ander bhej diya
- req.cookie k ander "data" aaya phir jwt.verify() se verify krr liya token ko 

```js
          if(user.password == password){

              //token : token nikal kar cookie me bhej diya 
              //payload , bydefault - algo [SHA256] , secrets
              //expire date add kiye
               const token = jwt.sign({ data:user["_id"], exp: Math.floor(Date.now() / 1000) + (60*60*24)}, secrets.JWTSECRET)
            
              //token/data bhejte hai <= cookie k ander
               res.cookie("JWT",token)

               res.send("user logged In")
          }else{
              res.send("email or password does't match")
          }
```
- login => user login kiya
-  res.cookie("JWT",token) <= token/data bhejte hai
```js
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

            // token 
            //payload , bydefault - algo [SHA256] , secrets
            // expire date add kiye
            const token = jwt.sign({ data:user["_id"], exp: Math.floor(Date.now() / 1000) + (60*60*24)}, secrets.JWTSECRET)
            
            // token/data bhejte hai <= cookie k ander
               res.cookie("JWT",token)

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

```

- verify 
- req.cookie => k ander data aata hai
- "/users" route => get all the users
```js
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
  const cookies = req.cookies 
  const JWT = cookies.JWT
  console.log("protect route encountered")
  //you are logged In then it will allow next fun to run
  const token = jwt.verify(JWT,secrets.JWTSECRET)
  console.log(token)
  next();
}


```
- protectRoute with try , catch
```js
function protectRoute(req, res, next) {
  try {
    // req.cookie => k ander data aata hai
    const cookies = req.cookies
    const JWT = cookies.JWT
    if (cookies.JWT) {
      console.log("protect route encountered")
      //you are logged In then it will allow next fun to run
      const token = jwt.verify(JWT, secrets.JWTSECRET)
      console.log(token)  // esi ka "output" show kiya hai
      next();
    } else {
      res.send("you are not logged In kindly Login")
    }

  } catch (err) {
    res.send(err.message)
  }
}

```


##### output :
```js
      protect route encountered
      { data: '642169d3a89370656d059925', exp: 1680007896, iat: 1679921496 }

```
------------------------

## user k profile => ka data show karna hai :


- "/user" route show kiya user ka profile => profile page 
```js
app.get("/user",protectRoute ,async function(req,res){
    // user k profile ka data show kiye
   
    try{
      //key access kya
       const userId = req.userId;
       // apne model me se "byId" fun se => user get karr legen
       const user = await FooduserModel.findById(userId);
       res.json({
        data:user,
        message:"Data about logged In user is send"
       })
    }catch(err){
      res.end(err.message)
    }
})

```

- token k ander , eske "data" property k ander , user ki "ID" aati hai
```js
function protectRoute(req, res, next) {
  try {
    // req.cookie => k ander data aata hai
    const cookies = req.cookies
    const JWT = cookies.JWT
    if (cookies.JWT) {
      console.log("protect route encountered")
      //you are logged In then it will allow next fun to run
      const token = jwt.verify(JWT, secrets.JWTSECRET)

     
     // token k ander eske "data" property k ander user ki "ID" aati hai
       let userId = token.data;
      // req obj k ander userId property banao , aur usme userId put kar do 
      // eska fayda ye hua ki => kis user ne "token" bheja hai pta lga sakte hai
      // ek obj par koi bhi "key"[req.userId me "userId" key hai] add kar sakte hai
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


```

## Note :
- requirements npm
```js
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

```
- signup
```js
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

```
- postman se 
- POST -> localhost:3000/signup
```js
{
    "name":"vikash",
    "email":"qwqw@321123",
     "password":"12345678910",
     "conformPassword":"12345678910"
}
```

- login
```js
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

```
- postman se "req" mari
- sabhi ka answer nhi likha hai
- POST -> localhost:3000/login
```js
{
    "email":"qwqw@321123",
    "password":"12345678910"
}
```
- users
```js
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

```
- postman se 
- GET -> localhost:3000/users
```js

```
- protectRoute
```js
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

```

- user
```js
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

```
- postman se 
- GET -> localhost:3000/user
```js

```

### forgetPassword :
- req --> email => how to send email through a server
- API :
   
   - search user on the basis of email --> phir usme "otp" put kar do 
   - send a OTP to the email
   

### resetPassword :
- req --> otp, password, conformPassword , put kiye 
- API :
   
   - search user on the basis of "otp"
   - update password liye
   - remove otp from user

#### forgetPassword
```js
app.patch("/forgetPassword", async function(req,res){
   try{
    // req --> email 
     let { email } = req.body;
     let otp = otpGenerator()
     // 1st - search user on the basis of "email"
     // 2nd - send otp to that email
     // 3rd - given permission to "update the value" by "{new:true}"
     // "new" bydefault "false" hota hai , new ko true krr dene se findOneAndUpdate value ko update kar dega
     let user = await FooduserModel.findOneAndUpdate({email:email},{otp:otp},{new:true});   
     
     console.log(user)

     res.json({
      data:user,
      message:"otp send to your mail"
     
    })
   }catch(err){
    res.end(err.message)
   }
})

```
- postman se 
- PATCH -> localhost:3000/forgetPassword
```js
body -> raw -> json
{
    "email": "qwqw@321123"
}
```
- otpGenerator
```js
function otpGenerator(){
  return Math.floor(100000 + Math.random() * 900000);
}
```

#### resetPassword
```js
app.patch("/resetPassword", async function(req,res){
  try{
    let { otp , password , confirmPassword } = req.body;
     //otp: undefined matlab otp remove ho gayi  
     // 1st --> jisse mai search kar rha hu  ==> otp k base par search karo 
     // 2nd --> jo hme update karna hai uss ke ander
     // 3rd --> validator run k liye
     // new bydefault false hota hai , new ko true krr dene se findOneAndUpdate value ko update kar dega
    // eske ander validators chalte nhi , toh true kiya
    let user = await FooduserModel.findOneAndUpdate({otp:otp},{password,confirmPassword},{runValidators:true,new:true});   
    
    // key delete -> get the document object -> modify that object by removing useless keys
    // otp remove kiye 
    user.otp = undefined;
    
    // save to save this doc in db
    await user.save()
    console.log(user)

    res.json({
     data:user,
     message:"password for the use is reset"
    
   })
  }catch(err){
   res.end(err.message)
  }
})

```
- postman se 
- PATCH -> localhost:3000/resetPassword
```js
body -> raw -> json
{
"otp": "406216",
"password": "12345678910",
"conformPassword": "12345678910"
}

```

## lec - 7 :

- usermodel
```js
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

```

### OTP Expiry :
#### forgetPassword
- add after 5 min otp are expired
```js
app.patch("/forgetPassword", async function (req, res) {
  try {
    // req --> email 
    let { email } = req.body;
    // otp expire after five min
    let afterFiveMin = Date.now() + 5 * 60 * 1000;
    let otp = otpGenerator()
    console.log(otp)
   
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

```
- otpGenerator
```js
function otpGenerator() {
  return Math.floor(100000 + Math.random() * 900000);
}
```


#### resetPassword 
- aapka currentTime otpExpire se jada hai toh aapka token expire ho gya hai
- agar otp expire nhi huaa hai toh password,conformPassword update kar do & 
  otp expire ko remove kar do
- bugs :
```js
    let { otp, password, confirmPassword} = req.body;
    // search -> get the user
    let user = await FooduserModel.findOne(otp)


    Note :
          1- first user ka OTP = 1234
             second user ka OTP = 1235

             agar 2nd wale ne 1st wale ka "otp" dal diya toh uske base par hamm dhudh rhe honge "user", 

             otpExpire k liye "otp" k base par user nhi nikalegen => 
             "email" match karegen [unique hota hai] , eske base par user nikal legen


    // otpExpire k liye email get kiye , 
    let { otp, password, confirmPassword, email} = req.body;
    // search -> get the user
    // email unique hai hamesa hame user unique hi milega 
    let user = await FooduserModel.findOne(email)

  
  Two step :
   //  pahle otp check kaegen expire toh nhi na huyi , phir 
   //  otp bad me compair karegen         

```      
```js
app.patch("/resetPassword", async function (req, res) {
  try {
    let { otp, password, confirmPassword, email } = req.body;
    // search -> get the user , for check "otp" expire or not
    let user = await FooduserModel.findOne(email)
    let currentTime = Date.now()
    
    // aapka currentTime otpExpire se jada hai toh aapka "token" expire ho gya hai
    if (currentTime > user.otpExpiry) { 
      // otp remove kiye 
      //user.otp = undefined;
      delete user.otp;
      // otpExpire remove kiya
      // user.otpExpiry = undefined
      delete user.otpExpiry
      // save to save this doc in db
      await user.save()
      console.log(user)

      res.json({
         message: "otp Expired"
      })

    } else {  // agar otp expire nahi huaa hai yoh password,conformPassword update kar do 

      // otp match nhi kiya
      if (user.otp != otp) { // "time" kam hai otp match nhi kiya 
        res.json({
          message: "otp does't match"
        })
      } else { // time kam hai "otp" match ho gya toh password , conformPassword update karr diya
        // otp,email k base prr search kar liya 
        // password ,conform pass update kiya
        user = await FooduserModel.findOneAndUpdate({ otp , email }, { password, confirmPassword }, { runValidators: true, new: true });
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

```

-------------------
-------------------
-------------------

### Structuring : 4-Rules : Good Practice
- start every route with ==> "/api"
    - yha se sirf "data" milega
- the route should have it's version appended after "/api"
    - kahne ka matlab har route aise start hona chahiye ==> "/api/v1/phir apna "user"
    - "/api/v1/user"
    - man lo ek hi chij ko multiple tarike se implement karna ho aur kuch set-of-version "v-1" par hi chalte ho , 
    
       "v-2" par chal hi nhi sakte , toh "v-1" ko available rakhna padega.
    
    

- use get/post/patch/delete method for doing an "action" & route to represent  -> entity
    - routes are "noun" 
       - route to represent  -> entity
            - eg. user , plans , auth , reviews , booking 
            - primary entity : user , plans [ense derived entity]
            - derived entity : auth, reviews , booking
    - methods are "verbs

- Appropriate status code

### MVC : (model view controller) 
------------------
![mvc-img](image/mvc.png)
#### Business Model :
- ye wo area refer kar rha hai , jha aap apna schema define karte ho.

  Database related chije hoti hai.
- model should be thick ==> kahne ka matlab max'm logic should be here.  

```js
userModel.js
---------------

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

```

#### Controller :
###### controller k ander aap kya dalte ho ,
- controller k ander aap ye sare fun'n dalte ho , jo kya karte hai => aayi huyi "req" ke hisab se apne "Model" se bat karte hai , aur aapko result dete hai.
```js

app.use("signup",async function(req, res){
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


Note : 
      ess functions ko hi hamm controller bolte hai.



//-------------------Controller Function-----------------------


//1=> controller fun'n

async function signupController(req, res) {
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
  }


//2=> 
 async function getAllUsersController(req, res) {
    try {
      let users = await FooduserModel.find();
      //to send json data
      res.json(users)
    } catch (err) {
      res.end(err.message);
    }
  }


```
### File structuring : IN MVC 
-----------------------------
![](image/strFile.png)

### Note : Good Approach
- signup ka router kya hona chahiye 
    - "api/vi/auth/signup"   <== It is a good pratics but not a "developer friendly"


### Good Approach :
- pahle 
```js
const express = require("express")
const app = express();

// to add post body data to req.body
app.use(express.json());

app.post("/signup",signupController);    ❎

OR 

app.post("/api/v1/auth/signup",signupController);    ✅


```
- abb
```js
const express = require("express")
const authRouter = express.Router()

app.use("/api/v1/auth",authRouter)
authRouter.post("/signup",signupController);       ✅

```
```js
user k liye
-------------
const express = require("express")
const userRouter = express.Router()

app.use("/api/v1/user",userRouter)
userRouter.post("/user",protectRouter,profileController);       ✅

```
#### Note :
- etna sara likhane se axa hai : "for good approach" =>
  
     app.post("/api/v1/auth/signup",signupController); 
  
  ye likh do =>
     
     app.use("/api/v1/auth",authRouter)
     authRouter.post("/signup",signupController);     ✅



### server.js
- server.js/api.js
```js

const express = require("express")
const app = express();

//npm i cookie parser
const cookieParser = require("cookie-parser")

//jsonwebtoken
// token name is -> JWT & mechanism -> cookies
const jwt = require("jsonwebtoken");
const secrets = require("./secrets");


const FooduserModel = require("./userModel");

// to add post body data to req.body
app.use(express.json());

// add cookies to req.cookies
app.use(cookieParser());

const authRouter = express.Router()
const userRouter = express.Router()

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/user", userRouter)

//auth
authRouter.post("/signup",signupController);
authRouter.post("/login",loginController);
authRouter.patch("/forgetPassword",forgetPasswordController);
authRouter.patch("/resetPassword",resetPasswordController);

// user
userRouter.get("/users",protectRoute,getAllUsersController);
userRouter.get("/user",protectRoute,profileController);



app.listen(3000, function () {
  console.log("server running on 3000 port")
})



// ------------------ helper function -------------------------------------

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




// ----------------- controller function -------------------------------------

 async function signupController(req, res) {
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
  }  




 async function profileController(req, res) {
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
  } 



 async function getAllUsersController(req, res) {
    try {
      let users = await FooduserModel.find();
      //to send json data
      res.json(users)
    } catch (err) {
      res.end(err.message);
    }
  } 



async function forgetPasswordController(req, res) {
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


```

#### Note :
- api ---> router ---> controller ---> model
- router
   - authRouter
   - userRouter
- controller 
   - authController
   - userController

##### api.js
```js
const express = require("express")

const app = express();

const cookieParser = require("cookie-parser")

const userRouter = require("./routes/userRoutes")
const authRouter = require("./routes/authRoutes")


// to add post body data to req.body
app.use(express.json())

// call kiye
app.use(cookieParser())

app.use("api/v1/auth",authRouter)
app.use("api/v1/auth",userRouter)

// update user profile
//delete user profile


app.listen(3000, function () {
  console.log("server running on 3000 port")
})


```

##### router : 1- authRouter , 2- userRouter
- authRouter
```js
const express = require("express")
const authRouter = express.Router();
const {signupController,loginController,resetPasswordController,forgetPasswordController} = require("../controller/authController")

authRouter.post("/signup",signupController)
authRouter.post("/login", loginController)
authRouter.patch("/forgetPassword", forgetPasswordController )
authRouter.patch("/resetPassword",resetPasswordController )

module.exports = authRouter;
```
- userRouter
```js
const express = require("express")
const userRouter = express.Router();
const {getAllUsersController,profileController} = require("../controller/userController")
const {protectRoute} = require("../controller/authController");

// users -> get all the users ( sare users la kar de deta hai ) -> sensitive route -> protect route -> logged In i will only allow that person
userRouter.get("/users", protectRoute, getAllUsersController)

// profile page
userRouter.get("/user", protectRoute, profileController)


module.exports = userRouter;
```
##### controller : 1- authController , 2- userController
- authController 
```js
// represent -> collection
const FooduserModel = require('../model/userModel')
var jwt = require('jsonwebtoken');
const secrets = require("../secrets")


// *************************controller function**********************
  async function signupController(req, res) {
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
  }
  
  async function forgetPasswordController(req, res) {
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
```
- userController 
```js
// represent -> collection
const FooduserModel = require('../model/userModel')

// *************************controller function**********************

async function getAllUsersController(req, res) {
    try {
      let users = await FooduserModel.find();
      //to send json data
      res.json(users)
    } catch (err) {
      res.end(err.message);
    }
  }
  
  
  async function profileController(req, res) {
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
  }


module.exports = {
    profileController : profileController,
    getAllUsersController : getAllUsersController
}  

```
##### model :
- userModel
```js
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

```

### secrets.js
- secrets.js 
```js
module.exports={
    JWTSECRET:"qwertyasdgh",
    DB_LINK : "mongodb+srv://yadavshashi:Ief8kvPHtozTckmj@freecluster.bmcxj8d.mongodb.net/?retryWrites=true&w=majority"
}

```
### model
- userModel.js
```js
const mongoose = require("mongoose")


//db server se connect --> mongoDb atlas se connect
let secrets = require("../secrets")


mongoose.connect(secrets.DB_LINK)
.then(function(){
    console.log("connected")
}).catch(function(err){
    console.log("error",err)
})

let userSchema = new mongoose.Schema({
  name:{
    type: String,
    required:[true,"Name is not send"]
  },
   password:{
    type:String,
    required:[true,"password is missing"]
  }
})

let FooduserModel = mongoose.model('foodUserModel',userSchema)
module.exports = FooduserModel;

```

### lec - 8 
#### nodemailer :
- npm install nodemailer
- nodemailer[folder] -> mailSender[file]
   - RUN : node .\mailSender
- search on google : "email template html css github" for learn email UI  

- secrets.js[file]
```js

module.exports={
    JWTSECRET:"qwertyasdgh",
    DB_LINK : "mongodb+srv://yadavshashi:Ief8kvPHtozTckmj@freecluster.bmcxj8d.mongodb.net/?retryWrites=true&w=majority",
    APP_PASSWORD : "flhgqrcakvcgjobn"
}

```
- nodemailer[folder] -> mailSender[file]
```js
const nodemailer = require("nodemailer");
let secrets = require("../secrets")

async function mailSender() {
    // input through which mechanism send your email -> port , facilitator(technical details lena )
    // aapke pas port number kya hoga , aapke pas sender kaun hoga 
    let transporter = nodemailer.createTransport({
        service:"gmail",
        host: "smtp.gmail.com",
        // port: 587,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "yadavshashikant2779@gmail.com", // generated ethereal user [ess email prr]
            pass: secrets.APP_PASSWORD, // generated ethereal password [ye "app-password" generate kiye]
        },
    });

    let dataObj = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "yadavofficial2779@gmail.com", // list of receivers [jisko bhejna hai]
        subject: "Hello ✔ Testing for email", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>HTML text testing email for fjp ?</b>", // html body
    }

    // send mail with defined transport object
    let info = await transporter.sendMail(dataObj);

}

mailSender()
    .then(function () {
        console.log("mail send successfully")
    })
    .catch(console.error);

```
#### nodemailer with token
- secrets.js
```js
module.exports={
    JWTSECRET:"qwertyasdgh",
    DB_LINK : "mongodb+srv://yadavshashi:Ief8kvPHtozTckmj@freecluster.bmcxj8d.mongodb.net/?retryWrites=true&w=majority",
    APP_PASSWORD : "flhgqrcakvcgjobn",
    APP_EMAIL : "yadavshashikant2779@gmail.com"
}
```
- mailSender.js 
```js
const nodemailer = require("nodemailer");
let secrets = require("../secrets")

async function mailSender() {
    // input through which mechanism send your email -> port , facilitator(technical details lena )
    // aapke pas port number kya hoga , aapke pas sender kaun hoga 
    let transporter = nodemailer.createTransport({
        service:"gmail",
        host: "smtp.gmail.com",
        // port: 587,
        secure: true, // true for 465, false for other ports
        auth: {
            user: secrets.APP_EMAIL, // generated ethereal user
            pass: secrets.APP_PASSWORD, // generated ethereal password
        },
    });

       
    let token = "hsdyjsdjcjhk"
    
    let dataObj = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "yadavofficial2779@gmail.com", // list of receivers
        subject: "Hello ✔ Testing for email", // Subject line
        text: "Hello world?", // plain text body
        html: `<b>HTML text testing email for fjp with token : ${token} </b>`, // html body
    }

    // send mail with defined transport object
    let info = await transporter.sendMail(dataObj);

}

mailSender()
    .then(function () {
        console.log("mail send successfully")
    })
    .catch(console.error);
```

#### Integrate our frontend to our backend :
* postman vs frontend
    * req ka button press -> req send hogi || UI ka button press -> yha bhi req same tarike se send hogi + loder... (add krna hoga)
    * response will you get || res will you get -> then you have do some change on UI
  
  * React code explain
    * 1'st step -> add backend url as proxy to react package.json => http://localhost:3000/
    * 2'nd step -> structuring
      *  Top : Header -> Home, plan, login/user profile
      *  Different pages
         *  signup page , profile , login , forgetpassword 
      * AuthProvider :
        * sync -> if you have a user or not , on login and logout 
        * It also exposes you lossley coupled auth functions -> all are together [app.js -> AuthProvider -> routes]
      
      *  signup page :

###  FoodAppFrontend
- Signup se -> AuthProvideer jayega 

- Signup.js
```js
import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/login.css';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../Context/AuthProvider';

function Signup(props) {
    // react-router-dom
    const history = useHistory();
    const { signUp } = useAuth()
    const [name, nameSet] = useState("");
    const [password, passwordSet] = useState("");
    const [email, emailSet] = useState("");
    const [confirm, setConfirm] = useState("");
    
    const handleSignup = async () => {
        try {
            console.log("sending request");
            // do signup
            await signUp(name, password, email, confirm);
            // send user to login 
            history.push("/login");
        }
        catch (err) {
            console.log(err);
        }
    }
// click
    return (
        <div className="container-grey">
            <div className="form-container">
                <div className='h1Box'>
                    <h1 className='h1'>SIGN UP</h1>
                    <div className="line"></div>
                </div>
                <div className="loginBox">
                    <div className="entryBox">
                        <div className="entryText">Name</div>
                        <input className="name input" type="text" name="Name" placeholder="Your Name" required="" onChange={(e) => nameSet(e.target.value)} />
                    </div>
                    <div className="entryBox">
                        <div className="entryText">Email</div>
                        <input className="email input" type="email" name="Email" placeholder="Your Email" required="" onChange={(e) => emailSet(e.target.value)} />
                    </div>
                    <div className="entryBox">
                        <div className="entryText">Password</div>
                        <input className="password input" type="password" name="Password" placeholder="**********" onChange={(e) => passwordSet(e.target.value)} />
                    </div>
                    <div className="entryBox">
                        <div className="entryText">Confirm  Password</div>
                        <input className="confirmPassword input" type="password" name="ConfirmPassword" placeholder="**********" onChange={(e) => setConfirm(e.target.value)} />
                    </div>
                    <button className="loginBtn  form-button" type="submit" onClick={handleSignup}>
                        Sign Up
                    </button>

                </div>
            </div>
        </div>
    )
}

export default Signup;

```

- AuthProvider.js
```js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
export const AuthContext = React.createContext();
//custom hook that allows components to access context data
export function useAuth() {
    return useContext(AuthContext)
}
// sync -> if you have a user or not , on login and logout 
// It also exposes you lossley coupled auth functions
// 
function AuthProvider({ children }) {
    // const history = useHistory();
    const [user, userSet] = useState("");  // user set hota hai
    const [loading, setLoading] = useState(false); 
    
    async function signUp(name, password, email, confirm) {
        try {
            console.log("signup will be here");
            let res = await axios.post
                ("/api/v1/auth/signup", {
                    name: name,
                    password: password,
                    confirmPassword: confirm,
                    email
                })
            console.log("data", res.data);

        } catch (err) {
            console.log("err", err.message);
        }
    }
   
    async function login(email, password) {
        try {
            setLoading(true);
            const res = await axios.post("/api/v1/auth/login", {
                email: email,
                password: password
            });
            setLoading(false);
            // console.log("40",res.data);
            userSet(res.data.user);
        }
        catch (err) {
            console.log(err);
            setLoading(false);
        }
        console.log("login will be here");
    }
    
    function logout() {
        // localStorage.removeItem("user")
        // userSet(null);
        console.log("logout will come here");
    }

    const value = {
        user,
        login,
        signUp,
        logout
    }
    return (
        < AuthContext.Provider value={value} >
            {/* if not loading show childrens -> agar loding nhi ho rahi toh children dikha do */}
            {!loading && children}    
        </AuthContext.Provider >
    )
}
export default AuthProvider

```
- backend --> contolller --> authcontroller --> loginController
```js

            // token/data bhejte hai <= cookie k ander
            res.cookie("JWT", token)
           
            // user login hua hai use "save" karna hai , without password and conform password
             delete user.password 
             delete user.conformPassword
            // before sending to frontend , remove password & conform password
            res.status(200).json({
              user
            })
```
```js 
  
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
             user.password = undefined;
             user.conformPassword = undefined;
            // before sending to frontend , remove password & conform password
            res.status(200).json({
              user
            })

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
  }

```
### proxy : search on google -> "using proxy create-react-app"
- npm install http-proxy-middleware --save
- src[folder] -> setupProxy.js[file]
```js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use("/api",
        createProxyMiddleware({
            // server ke home page ka link
            target: 'http://localhost:3000',
            changeOrigin: true,
        })
    );
};

```
##### Note: 
- You do not need to import this file anywhere. It is automatically registered when you start the development server.
  


### lec - 9 :
#### contents :
- 1xx : Informational Response  – the request was received, continuing process
- 2xx : Successful – the request was successfully received, understood, and accepted
- 3xx : Redirection – further action needs to be taken in order to complete the request
- 4xx : Client Errors – the request contains bad syntax or cannot be fulfilled
- 5xx : Server Errors – the server failed to fulfil an apparently valid request

#### status code :
- Switching Protocols - 101 
- OK - 200
- Created - 201
- NOT FOUND - 404
- Bad Request - 400
- Internal Server Error - 500
- Resource Update Successfully - 204

### login ka status code :
- login status code - backend
```js
     if (user.password == password) {
  
            // // token 
            // //payload , bydefault - algo [SHA256] , secrets
            // // expire date => kab hoga wo add kiya 
            // const token = jwt.sign({ data: user["_id"], exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) }, secrets.JWTSECRET)
  
            // // token/data bhejte hai <= cookie k ander
            // res.cookie("JWT", token)
           
            // // user login hua hai use "save" karna hai , without password and conform password
            //  user.password = undefined;
            //  user.conformPassword = undefined;
            // before sending to frontend , remove password & conform password
            res.status(200).json({    // 1st
              user
            })

          } else {
            // email or password missmatch
            res.status(400).json({    // 2nd
              result : "email or password does't match"
            })
          }
  
        } else {
          //user not found
          res.status(404).json({ // 3rd
            result :"user not found"
          })
        }
      } else {
        //something is missing
        res.status(400).json({ // 4th
          result:"user not found kindly signup"
        })
      }
    } catch (err) {
      //server crashed 
      res.status(500).json({   // 5th
        result: err.message
      })
    }

```
```js

// *************************controller function**********************

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
             user.password = undefined;
             user.conformPassword = undefined;
            // before sending to frontend , remove password & conform password
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

```
- login status code with authProvider(Context API) on frontend
```js
async function login(email, password) {
        // return status
        let flag = true
        try {
            setLoading(true);
            const res = await axios.post("/api/v1/auth/login", {
                email: email,
                password: password
            });
           
            // checks
            if(res.status == 404){
                alert("Password or Email may be wrong")
                flag = false
            }else if(res.status == 400){
                alert("user not found kindly login")
                flag = false
            }else if(res.status == 500){
                alert("Internal server error")
                flag = false
            }else{
                userSet(res.data.user);
            }
            setLoading(false);
           // console.log("40",res.data)
           return flag;
        }
        catch (err) {
            flag = false
            console.log(err);
            setLoading(false); // error aaya toh
            return flag
        }
        console.log("login will be here");
    }
    
```
#### signup status code :
- signup status code - backend
```js

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

```
- signup status code with authProvider(Context API) on frontend
```js

async function signUp(name, password, email, confirm) {
        try {
            setLoading(true)
            console.log("signup will be here");
            let res = await axios.post
                ("/api/v1/auth/signup", {
                    name: name,
                    password: password,
                    confirmPassword: confirm,
                    email
                })
            if(res.status == 400){
                alert("improper user data entry")
               
            }
            setLoading(false)
            console.log("data", res.data);

        } catch (err) {
            console.log("err", err.message);
            setLoading(false)
        }
    }

```

#### profile :
- profile page k liye :
   - frontend  prr --> profile page [par "user" mil ja rha toh "backend" se user lane ki jarurat nhi huyi]
- Profile Page --> profile.js
```js
import React, { useState } from 'react';
import '../Styles/profile.css';
import { useAuth } from '../Context/AuthProvider';
import axios from 'axios';

function Profile() {
    const { user } = useAuth();
    // const [password, passwordSet] = useState(user.user.password)
    // const [passwordCnf, passwordCnfSet] = useState(user.user.password)
    // const [email, emailSet] = useState(user.user.email);
    // const [name, nameSet] = useState(user.user.name);

    // const handleClick = async () => {
    //     try {
    //         console.log(user.user._id);
    //         const data = await axios.patch("/api/users/" + user.user._id,
    //          { headers: { "Authorization": `Bearer ${user.token}` } }, {
    //             email,
    //             name,
    //             password,
    //             confirmPassword: passwordCnf,
    //             role: user.user.role,
    //             _id:user.user._id
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    console.log(user);
    return (
        <div className="container-grey">
            <div className="form-container">
                <div className='h1Box'>
                    <h1 className='h1'>Profile</h1>
                    <div className="line"></div>
                    <div className="profileImage">
                        <img src={user.pic} />
                    </div>
                </div>
                <div className="loginBox">
                    {/* <div className="entryBox">
                        <input type="file" />
                    </div> */}
                    <div className="entryBox">
                        <div className="entryText">Email</div>
                        <input className="email input" type="email" value={user.email} />
                    </div>
                    {/* <div className="entryBox">
                        <div className="entryText">Password</div>
                        <input className="password input" type="text" value={password} onChange={(e) => passwordSet(e.target.value)} />
                    </div> */}
                    {/* <div className="entryBox">
                        <div className="entryText">Confirm Password</div>
                        <input className="password input" type="text" value={passwordCnf} onChange={(e) => passwordCnfSet(e.target.value)} />
                    </div> */}
                    <div className="entryBox">
                        <div className="entryText">Name</div>
                        <input className="password input" type="text" value={user.name} />
                    </div>
                    {/* <button className="loginBtn  form-button" type="submit" onClick={handleClick}>
                        Update Profile
                    </button> */}
                </div>
            </div>
        </div>
        
        // update details
        // reviews
        // bookings
    )
}

export default Profile

``` 

#### Forgate Password :
###### forgate password k liye "email" hi lega 
- backend -> nodemailer -> "mailSender"
```js
const nodemailer = require("nodemailer");
let secrets = require("../secrets")

// mailSender ko ek email send karna hoga with "forgate password"
async function mailSender(email,token) {
    // input through which mechanism send your email -> port , facilitator(technical details lena )
    // aapke pas port number kya hoga , aapke pas sender kaun hoga 
    let transporter = nodemailer.createTransport({
        service:"gmail",
        host: "smtp.gmail.com",
        // port: 587,
        secure: true, // true for 465, false for other ports
        auth: {
            user: secrets.APP_EMAIL, // generated ethereal user
            pass: secrets.APP_PASSWORD, // generated ethereal password
        },
    });

    
    let dataObj = {
        from: '"Food_App clone 👻" <foo@example.com>', // sender address
        to: "yadavofficial2779@gmail.com", // list of receivers [jisko bhejna hai]
        subject: "Hello ✔ your reset token", // Subject line
        text: "Hello world?", // plain text body
        html: `<b>your reset token is : ${token} </b>`, // html body
    }

    // send mail with defined transport object
    let info = await transporter.sendMail(dataObj);

}


// esko call nhi karegen - forget password me call krr rhe 
// mailSender(email,token)
//     .then(function () {
//         console.log("mail send successfully")
//     })
//   

module.exports = mailSender    

```
- Frontend prr -> ForgetPassword
```js
import React, { useState } from 'react';
import '../Styles/login.css'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useAuth } from '../Context/AuthProvider';
function ForgetPassword() {
    const [email, emailSet] = useState("");
    const history = useHistory();
    
    // email send karne ko mannage krr rhe -> email kha send karna "hamne jo  mail account banaya tha wha"
    const sendEmail = async () => {
        // request kiye -> forgetPassword Route k liye , with email 
        try {
            let res = await axios.patch("/api/v1/auth/forgetPassword", { email });
            if(res.status == 404){
                alert("user with this email not found");
            }else if(res.status == 500){
                alert("Internal server error");
            }else{
                alert("Mail send to your registered email Id "); // mail k account se jo login kiya tha
                // send to a resetPassword page
            }
            
        } catch (err) {
            console.log(err.message);
        }
        // send to resetPassword Page
    }
    return (
        <div className="container-grey">
            <div className="form-container">
                <div className='h1Box'>
                    <h1 className='h1'>FORGET PASSWORD</h1>
                    <div className="line"></div>
                </div>
                <div className="loginBox">
                    <div className="entryBox">
                        <div className="entryText">Email</div>
                        <input className="email input"
                            type="email" name="Email" placeholder="Your Email"
                            onChange={(e) => emailSet(e.target.value)} />
                    </div>
                    <button className="loginBtn  form-button"
                        onClick={sendEmail}>
                        Send Email
                    </button>

                </div>
            </div>
        </div>
    )
}

export default ForgetPassword

```
- backend prr -> authController --> forgetPasswordController
   - ye jo code hai , esse axa niche wala code hai - clean
   ```js
      async function forgetPasswordController(req, res) {
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
        }
   ```
   - ye clean code hai 
   ```js
       // represent -> collection
        const FooduserModel = require('../model/userModel')
        var jwt = require('jsonwebtoken');
        const secrets = require("../secrets")
        // mailSender ko require kiye , forget password krne k  liye
        const mailSender = require("../nodemailer/mailSender")


      async function forgetPasswordController(req, res) {
            try {
                let { email } = req.body;
                //    mail
                // by default -> FindAndUpdate -> not updated send document, 
                // new =true -> you will get updated doc
                // email -> email k base prr "user" find kiye , user nhi mila toh "user not found" , then update
                // update
                let user = await FooduserModel.findOne({ email });
                if (user) {
                  // user mila toh "otp" generate kiye , 5min bad expire ho , mail send kar diye "user jis email se login huaa tha" - mail account
                    let otp = otpGenerator();
                    let afterFiveMin = Date.now() + 5 * 60 * 1000;

                    await mailSender(email, otp);

                    user.otp = otp; // jo otp generate kiye user otp me bhej diye
                    user.otpExpiry = afterFiveMin;
                    await user.save();     // user save kiye - update 
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
   ```   

#### Reset Password :
- resetPassword k liye Frontend & Backend dono ki jarurat hogi
###### Reset Password k liye chahiye hota hai => 1- otp , 2- password , 3- conform password  
###### 1st - hamm email send karte hai , apne mail-account prr - nodeMailder se 
###### 2nd - phir apne mail-accout prr "otp" se verify karte hai  <=== eska ek page banaye
###### 3rd - phir password , and conform password set karte hai <=== aur eska ek page banaye

![](image/resetPassword.png)

- Frontend prr
- email, otp globally save krr liye "AuthProvider" me
- AuthProvider.js
```js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
export const AuthContext = React.createContext();
//custom hook that allows components to access context data
export function useAuth() {
    return useContext(AuthContext)
}
// sync -> if you have a user or not , on login and logout 
// It also exposes you lossley coupled auth functions
// 
function AuthProvider({ children }) {
    // const history = useHistory();
    const [user, userSet] = useState("");  // user set hota hai
    const [loading, setLoading] = useState(false); 
    
    // resetpassword karne ja rhe tab -> otp,email ki jarurat hogi
    // eamil,otp globally save karr liye
    const [resetPassEmail, setResetEmail] = useState(null);
    const [otpPassEmail, setOtpPassEmail] = useState(null);


    
    async function signUp(name, password, email, confirm) {
        try {
            setLoading(true)
            console.log("signup will be here");
            let res = await axios.post
                ("/api/v1/auth/signup", {
                    name: name,
                    password: password,
                    confirmPassword: confirm,
                    email
                })
            if(res.status == 400){
                alert("improper user data entry")
               
            }
            setLoading(false)
            console.log("data", res.data);

        } catch (err) {
            console.log("err", err.message);
            setLoading(false)
        }
    }
   
    async function login(email, password) {
        // return status
        let flag = true

        try {
            setLoading(true);
            const res = await axios.post("/api/v1/auth/login", {
                email: email,
                password: password
            });
            
            // checks
            if(res.status == 404){
                alert("Password or Email may be wrong")
                flag = false
            }else if(res.status == 400){
                alert("user not found kindly login")
                flag = false
            }else if(res.status == 500){
                alert("Internal server error")
                flag = false
            }else{
                userSet(res.data.user);
            }
            setLoading(false);
           console.log("rtgrwtyw",res.data)
           return flag;
        }
        catch (err) {
            flag = false
            console.log(err.message);
            alert("Password or email may be wrong");
            setLoading(false); // error aaya toh
            /* `// return flag` is returning a boolean flag that indicates whether the login was
            successful or not. It is used in the `login` function to check if there was an error
            during the login process and to handle it accordingly. If there was an error, the flag
            is set to `false` and the function returns `false`. Otherwise, the flag is set to `true`
            and the function returns `true`. This flag can be used by the calling component to
            determine if the login was successful or not. */
            return flag
        }
        console.log("login will be here");
    }
    
    function logout() {
        // localStorage.removeItem("user")
        // userSet(null);
        console.log("logout will come here");
    }

    const value = {
      // global store se pass kiye 
        user,
        login,
        signUp,
        logout,
        resetPassEmail,
        setResetEmail,
        otpPassEmail,
        setOtpPassEmail
    }
    return (
        < AuthContext.Provider value={value} >
            {/* if not loading show childrens -> agar loding nhi ho rahi toh "children" dikha do */}
            {!loading && children}    
        </AuthContext.Provider >
    )
}
export default AuthProvider

```

- Login Page --> ForgetPassword.js
- forget password karegen toh ==> email mangenga toh email set karayegen
```js
import React, { useState } from 'react';
import '../Styles/login.css'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useAuth } from '../Context/AuthProvider';

function ForgetPassword() {
    const [email, emailSet] = useState("");
    //
    const { setResetEmail } = useAuth();
    const history = useHistory();

     // email send karne ko mannage krr rhe -> email kha send karna "hamne jo  mail account banaya tha wha"
    const sendEmail = async () => {
        // request kiye -> forgetPassword Route k liye , with email
        try {
            let res = await axios.patch("/api/v1/auth/forgetPassword", { email });

            alert("Mail send to your registerd email ID");
            // esse kya hoga -> context[AuthProvider] k pass chali jayegi ye "email" --> next page ko de paunga ki "open" hoga ya nhi
            // mail save kiya 
            // forget password karte wakt email managa wahi diye
            setResetEmail(email);
            // send to your restpasswordPage
            // then otp wale page prr bhej diya
            history.push("/otp");

        } catch (err) {
            console.log(err.message);
            if (err.message == "Request failed with status code 404") {
                alert("user with this email not found");
            } else if (err.message == "Request failed with status code 500") {
                alert("Internal server error");
            }
        }
        // send to resetPassword Page
    }
    return (
        <div className="container-grey">
            <div className="form-container">
                <div className='h1Box'>
                    <h1 className='h1'>FORGET PASSWORD</h1>
                    <div className="line"></div>
                </div>
                <div className="loginBox">
                    <div className="entryBox">
                        <div className="entryText">Email</div>
                        <input className="email input"
                            type="email" name="Email" placeholder="Your Email"
                            onChange={(e) => emailSet(e.target.value)} />
                    </div>
                    <button className="loginBtn  form-button"
                        onClick={sendEmail}>
                        Send Email
                    </button>

                </div>
            </div>
        </div>
    )
}

export default ForgetPassword

```

- Login Page --> Otp.js
```js
import React, { useState } from 'react';
import '../Styles/login.css'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useAuth } from '../Context/AuthProvider';

function OTP() {
    const [otp, otpSet] = useState("");
    const history = useHistory();

    const { resetPassEmail, setOtpPassEmail } = useAuth();
    
    const saveOTP = async () => {
        setOtpPassEmail(otp); // otp set/put kiye ==> ye setOtpPassEmail[ otp ] "PasswordReset" page me ja kar "otp" me set krr denge
        // send to password and confirm password page => yha se send kiye password,conform-password page par 
        history.push("/passwordReset") 
        
    }
   
   return (<>
        {
          // resetPassEmail not null hai toh ye page dikha do [send email hai toh hi ye page khule ] --> otp wala page dikha do 
            resetPassEmail != null ?       
                <div className="container-grey">
                    <div className="form-container">
                        <div className='h1Box'>
                            <h1 className='h1'>ENTER OTP</h1>
                            <div className="line"></div>
                        </div>
                        <div className="loginBox">
                            <div className="entryBox">
                                <div className="entryText">OTP</div>
                                <input className="email input" value={otp}
                                    type="text" name="Email" placeholder="Your OTP"
                                    onChange={(e) => otpSet(e.target.value)} />
                            </div>
                            <button className="loginBtn  form-button"
                                onClick={saveOTP}>
                                Send OTP
                            </button>

                        </div>
                    </div>
                </div>
                : <h2 className='container-grey'>First go to your Forget Password</h2>
        }
    </>


    )
}

export default OTP;

```

- Login Page --> PasswordReset [ resetPassword page ]
```js
// esme [ password , conform-password ] wala "page" hoga
// ess page parr email,otp dono chahiye

import axios from 'axios';
import React, { useState } from 'react'
import { useAuth } from '../Context/AuthProvider';
import { useHistory } from "react-router-dom";

function PasswordReset() {
  // password aur conformPassword set karne k liye "state" liye
    const [password, passwordSet] = useState("");
    const [passwordCnf, passwordCnfSet] = useState("");
    const { resetPassEmail, setResetEmail, otpPassEmail, setOtpPassEmail } = useAuth();
    const history = useHistory();

    // email,otp  => ess page ko open karne k liye email, otp dono chahiye  
    // ye send karega request to your reset password 
    const resetPassword = async () => {
        // i will send evrything jo required 
        // -> done  -> email,otp -> null => email,otp ko null kar degen ki page open ho jaye dubara 
        // send to login page  => agar kam ho jaye " password reset karne ka " to bhej degen "login" page par
        // no done -> email ,otp-> null => done ho chahe not done toh bhi hmm email,otp ko null kar degen ki page open ho dubara
        try {
            // backend me - resetPassword kya kya leta hai -> otp, password, confirmPassword, email
            // backend prr request mara
            let res = await axios.patch("/api/v1/auth/resetPassword", {
              // sab otp,email,password,conformPassword set krr diye [jo global se bhi email,otp aayi thi ]
                otp: otpPassEmail,
                email: resetPassEmail,
                password: password,
                confirmPassword: passwordCnf
            })
            if (res.status == 201) {
                alert("password changed successfully");
                setOtpPassEmail(null); // enn dono ko null kar diya ki koi miss use na karr paye
                setResetEmail(null);  
                history.push("/login");  // login prr bhej diya , password change hone k bad 
            } else if (res.status == 200) {
                if (res.message == "Otp Expired") {
                    alert("Otp expried kindly regenerate ")
                } else if (res.message == "wrong otp") {
                    alert("wrong otp");
                }
                setOtpPassEmail(null);
                setResetEmail(null);
            }
        } catch (err) {
            console.log(err.message);
            if (err.message == "Request failed with status code 500") {
                alert("Internal server error");
            }
            setOtpPassEmail(null);
            setResetEmail(null);
        }
    }

    return (
        <>
            {
                // email,otp aayi ho toh open kar do page ko
                resetPassEmail && otpPassEmail ?
                    <div className="container-grey">
                        <div className="form-container">
                            <div className='h1Box'>
                                <h1 className='h1'>RESET PASSWORD</h1>
                                <div className="line"></div>
                            </div>
                            <div className="loginBox">
                                <div className="entryBox">
                                    <div className="entryText">Password</div>
                                    <input className="password input" type="text" value={password} onChange={(e) => passwordSet(e.target.value)} />
                                </div>
                                <div className="entryBox">
                                    <div className="entryText">Confirm Password</div>
                                    <input className="password input" type="text" value={passwordCnf} onChange={(e) => passwordCnfSet(e.target.value)} />
                                </div>
                                <button className="loginBtn  form-button"
                                    onClick={resetPassword}>
                                    Send OTP
                                </button>

                            </div>
                        </div>
                    </div>
                    : <h2 className='container-grey'>First go to your Forget Password</h2>

            }
        </>


    )
}

export default PasswordReset

```

- App.js
```js
import React from 'react';
import Signup from './Components/Login Page/Signup';
import Home from './Components/Home Page/Home';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from './Components/Home Page/NavBar';
import Footer from './Components/Home Page/Footer';
import Login from './Components/Login Page/Login';
import ForgetPassword from './Components/Login Page/ForgetPassword';
import AllPlans from './Components/Plan Page/AllPlans';
import AuthProvider from './Components/Context/AuthProvider';
import Profile from './Components/Profile Page/Profile';
import PlanDetail from './Components/PlanDetail Page/PlanDetail';
import {Otp} from './Components/Login Page/Otp'
import {PasswordReset} from './Components/Login Page/PasswordReset'


function App() {
  return (
    <Router>
      {/* AuthProvider : is providing the data that is your user logged in or not */}
      <AuthProvider>
        <NavBar />
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/profilePage">
            <Profile />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/forgetPassword">
            <ForgetPassword />
          </Route>
          <Route path="/otp">
            <Otp/>
          </Route>
          <Route path="/passwordReset">
            <PasswordReset/>
          </Route>


          <Route path="/allPlans">
            <AllPlans />
          </Route>
          <Route path="/planDetail/:id">
            <PlanDetail />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </AuthProvider>
    </Router>
  );
}
export default App;

```

- backend --> controller --> authController.js
```js
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
  
        res.status(400).json({
          result: "otp Expired"
        })
  
      } else {  // agar otp expire nahi huaa hai yoh password,conformPassword update kar do 
  
        // otp match kiya
        if (user.otp != otp) { // "time" kam hai otp match nhi kiya 
          
          res.status(400).json({
            result: "wrong otp"
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
  
          res.status(201).json({
            data: user,
            message: "user password reset"
  
          })
        }
      }
  
    } catch (err) {
      res.status(500).json({
        result:err.message
      })
    }
  }

```


