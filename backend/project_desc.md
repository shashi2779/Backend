# Meal Plans delivery website -> EatFit clone

### pages

* Home :
   * Majorly Static
   * Top 3 Plans
   * Top 3 reviews

* User
  * Login Page
  * Signup Page
  * Forget Password
  * ResetPassword Page
  * Profile Page
     * user details : Email,Name,Img
     * Booked Plans
* Plans
  * All Plans
  * Plan Details
    * Discreption of the plan (price... etc)
    * Buy Now Button
    * Reviews
### Backend Arcitecture : MVC(Model-View-Controller) arcitecture ,REST API 
### Database : mongoDb,Mongoose
### Authentication : Json web token
### 3rd party : 
         * Payment Gateway : RazorPay
         * Email : nodemailer,gmail
### Testing : PostMan
### Frontend : React , Backend : Express
### Deployment :
    * Backend : Heroku
    * Frontend : Netlify
    * Codebase : Github
    * Database server : mongoDb atlas  
* Futher improvement : videos , feedback , meal level            


-----------------------
-----------------------
------------------------

## steps:
- user :
      
      - profile
      - login
      - signup
      - forget
      - reset
- plans :
     
     - display 
               
               -> all pages
               -> description

- reviews :
     
     - reviews , books

- top 3 plans

## 9 agst / 2022  :  IMP
* 1- How to send automated Email via node.js --> nodemailer
     * Email : me HTML,CSS "inline" hoti hai -> modern css does't work in email
     * mail send -> nodemailer , transport ->gmail
        * "mail" send karne k liye ek "module" chahiye hota hai - > nodemailer
         
          aur sath-2 "transport" chahiye hota hai -> "transport" mtlb kiske through "mail" bhejna chahte ho -> "gmail" k through 
            * 1'st step :=> gmail se -> "app" identify karne k liye -> app-id , app-password
               * search gmail -> & go to your google account -> & go to security ->signing in to google -> enable 2 factor authentication -> then u found "app-password" : generate new "app-password"
            
            [ 1'st step : gmail se "app" identify karne k liye -> aapko ek unique "app id" nikalni hoti hai , aur "app-password" [bcz ho sakta hai ek banda multiple application k liye multiple bar use kare uska]]
            
            [ http stateless hoti hai -> esko nhi pta ki pichhali bar kaun aaya tha , toh gamil/email bhejne k liye aapko ek "app id" di jati hai <- ye "app-id" aapko uniquely identify karta hai , aur ess "app" ka "app-password" diya jata hai bcz multiple app aapka ek hi gmail se mail bhej sakte hai , toh banda kisko mail bhej rha "app-password" se hi pta ho sakta hai] <= generate "app-password"

            
            * 2nd step :=> templete -> string form html
            * 3rd step :=> node mailer use -> send the mail
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
            user: "yadavshashikant2779@gmail.com", // generated ethereal user
            pass: secrets.APP_PASSWORD, // generated ethereal password
        },
    });

    let dataObj = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "yadavofficial2779@gmail.com", // list of receivers
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
* 2- Integrate our frontend to our backend :
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
      
      * signup page :


