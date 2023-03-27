
## lec - 6 
#### jwt npm 
#### token == jwt , ko cookie k ander bhejte hai 
- npm install jsonwebtoken
- var jwt = require('jsonwebtoken');


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


- verify

      function protectRoute(req,res,next){
        // req.cookie => k ander data aata hai
        const cookies = req.cookies 
        const JWT = cookies.JWT
        console.log("protect route encountered")
        //you are logged In then it will allow next fun to run
        const token = jwt.verify(JWT.secrets.JWTSECRET)
        console.log(token)
        next();
      }


##### output :
```js
      protect route encountered
      { data: '642169d3a89370656d059925', exp: 1680007896, iat: 1679921496 }

```

## In Brief :

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