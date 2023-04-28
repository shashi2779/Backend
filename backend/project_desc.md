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
            * 1'st step :=> gmail se "app" identify karne k liye -> app-id , app-password
            * 1'st step : gmail se "app" identify karne k liye -> aapko ek unique "app id" nikalni hoti hai , aur "app-password" [bcz ho sakta hai ek banda multiple application k liye multiple bar use kare uska]
            
            [ http stateless hoti hai -> esko nhi pta ki pichhali bar kaun aaya tha , toh gamil or email bhejne k liye aapko ek "app id" di jati hai <- ye "app-id" aapko uniquely identify karta hai , aur ess "app" ka "app-password" diya jata hai bcz ho sakta hai ek banda multiple application k liye multiple bar use kare uska , kab kaun si application aapki email ka uske liye hota hai. ]
            
            * 2nd step :=> templete -> string form html
            * 3rd step :=> node mailer use -> send the mail

* 2- Integrate our frontend to our backend :
  * React code explain
  * signup page , profile , login , forgetpassword , resetpassword
