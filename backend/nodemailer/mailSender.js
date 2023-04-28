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