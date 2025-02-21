const express= require("express")
const router= express.Router()

const {handleSignUp}= require("../controllers/signup.controller")



router
.route("/signup")
.post(handleSignUp)

module.exports= router