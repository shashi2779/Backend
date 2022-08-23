const mongoose = require("mongoose")

let dblink = "mongodb+srv://yadavshashi:Ief8kvPHtozTckmj@freecluster.bmcxj8d.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(dblink)
.then(function(){
    console.log("connected")
}).catch(function(err){
    console.log("error",err)
})

