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

      4- req.end("data from server") 

       - { req.end } se data postman(frontend) prr print karega 

      5- req.body me data aaye eske liye [ app.use(express.json()); ] use kiye file me
       
       - if you want to accept data in backend
       - esko [ app.use(express.json()); ] post route k upar hi likhana padta h ,
         aur ye line likhane se aapka data put ho jata h

## post route -create data
     
     
     * postman se data bheje
        
     {
        "name":"frontend kuchh bola"
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
     req.body me data aaye uske liye [ app.use(express.json()); ] 
      karegen route k upar    

    
    * postman se data bheje
    
     {
        "name":"frontend kuchh bola"
     }


     app.use(express.json());      
      
     app.post("/sayhello",function(req,res){
        console.log("data->",req.body);
        res.end("post wala hello from server")
     })  
     

     
#### output :

     backend output (node):
                            data -> frontend kuchh bola

    
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

    const mongoose = require("mongoose")

    let dblink = "mongodb+srv://yadavshashi:Ief8kvPHtozTckmj@freecluster.bmcxj8d.mongodb.net/?retryWrites=true&w=majority"

    mongoose.connect(dblink)
    .then(function(){
        console.log("connected")
    }).catch(function(err){
        console.log("error",err)
    })

   
    