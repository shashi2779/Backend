# install

1- npm init -y

2- npm install express

3- npm i -g nodemon

*add "start":"nodemon server.js" to package.json

//if you want to accept data in backend then use it with  "post" route. 

# app.use(express.json())
- if you want to accept data in backend
- req.body me data aaye eske liye  [ app.use(express.json()) ] use kiye apne file m
- esko post route k upar likhana padta h 
- ye line likhane se aapka data put ho jata h
