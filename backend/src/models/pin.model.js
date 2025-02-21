const mongoose= require("mongoose")

const PinSchema= new mongoose.Schema({
    userName:{
        type: String,
        required: true,
    },

    title:{
        type: String,
        required: true,
    },

    description:{
        type: String,
        required: true,
    },

    rating:{
        type: Number,
        min:0,
        max:5,
        required: true,
    },

    latitude:{
        type: Number,
        required: true,
    },

    longitude:{
        type: Number,
        required: true,
    },

},{timestamps: true})

const Pin= mongoose.model("Pin",PinSchema)

module.exports= Pin