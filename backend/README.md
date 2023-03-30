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
    
    app.use(express.json());

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
- jo jo fun aapke ess cycle ko change kar sakte hai unhe middleware kahte hai

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
      
      (encrypted text - ye text hi hai esse koui bhi change karr sakta hai)
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

- token k ander eske "data" property k ander user ki "ID" aati hai
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
   
   - send a OTP to the email
   - search user on the basis of email --> phir usme "otp" put kar do 

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
     //1st --> jisse mai search kar rha hu  ==> otp k base par search karo 
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

```
- postman se 
- PATCH -> localhost:3000/resetPassword
```js


```

## lec - 7 :