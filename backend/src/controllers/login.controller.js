const User= require("../models/user.model.js")
const bcrypt= require("bcryptjs")

async function handleLogin(req,res){
    const {email,password}= req.body;
    if(!email || !password){
        return res.status(400).json({
            msg:"all fields are required"
        })
    }  
    
    try {
        const user = await User.findOne({email:email})
        if(!user){
            return res.status(404).json({
                msg:"user not found"
            })
        }

        const validatePassword= await bcrypt.compare(password,user.password)
        if(!validatePassword){
            return res.status(400).json({
                msg:"wrong password"
            })
        }

        return res.status(200).json({
            msg:"user logged in",
            userName:user.userName,
            email:user.email
        })

    } catch (error) {
        console.log("error loggin in the user",error)
        return res.status(500).json({
            msg:"internal server error"
        })
    }
}

module.exports={
    handleLogin
}