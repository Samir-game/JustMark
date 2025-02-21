const {connectionDB}= require("./db/index.js")
const dotenv= require('dotenv')
const app= require("./app.js")

dotenv.config({
    path:"./env"
})

connectionDB()
.then(()=>{
    console.log("connection to database completed");
    app.listen( process.env.PORT || 8001,()=>{
        console.log("Server satated at Port: ",process.env.PORT)
    })
})
.catch((error)=>{
    console.log("Error connecting to DataBase",error)
})