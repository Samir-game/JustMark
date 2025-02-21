const express= require("express")
const router= express.Router()
const {handleCreatePin}= require("../controllers/pin.controller.js")


router
.route("/")
.post(handleCreatePin)

module.exports= router