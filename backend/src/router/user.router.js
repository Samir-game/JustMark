const express= require("express")
const router= express.Router()

const {handleSignUp}= require("../controllers/signup.controller")
const {handleLogin}= require("../controllers/login.controller.js")




router
.route("/signup")
.post(handleSignUp)
router
.route("/login")
.post(handleLogin)

module.exports= router