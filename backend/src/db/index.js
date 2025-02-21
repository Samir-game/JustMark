const mongoose= require("mongoose")
const DB_NAME= require("../constants.js")

async function connectionDB(){
    try {
        const result= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("MongoDB connected!",result.connection.host)
    } catch (error) {
        console.log("Error connecting to MongoDB",error)
        process.exit(1)
    }

}

module.exports={
    connectionDB
}