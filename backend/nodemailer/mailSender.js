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
//     .catch(console.error);

module.exports = mailSender    