const Pin = require("../models/pin.model");

async function handleCreatePin(req,res){
    const {userName, title, description, rating, latitude, longitude} = req.body;
    if(!userName || !title || !description || !rating || !latitude || !longitude){
        return res.status(400).json({
            msg:"all fields are required"
        })
    }

    try {
        const newPin= new Pin(req.body)
        const savedPin= await newPin.save()

        return res.status(200).json({
            msg:"pin created",
            savedPin
        })

    } catch (error) {
        console.log("error creating the pin",error)
        return res.status(500).json({
            msg:"internal server error"
        })
    }
}

async function handleGetAllPins(req,res){
    try {
        const pins= await Pin.find()
        return res.status(200).json({
            pins
        })
    } catch (error) {
        console.log("error getting all the pins",error)
    }
}


module.exports={
    handleCreatePin,
    handleGetAllPins,
}