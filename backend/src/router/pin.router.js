const express= require("express")
const router= express.Router()
const {handleCreatePin, handleGetAllPins}= require("../controllers/pin.controller.js")


router
.route("/")
.post(handleCreatePin)

router
.route("/")
.get(handleGetAllPins)

module.exports= router