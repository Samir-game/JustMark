const express= require("express")
const app= express()
const cors= require("cors")
const userRouter= require("./router/user.router.js")
const pinRouter= require("./router/pin.router.js")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/user", userRouter)
app.use("/api/pin", pinRouter)

module.exports=app;