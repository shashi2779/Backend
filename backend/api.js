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













