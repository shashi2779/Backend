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
### points

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
           