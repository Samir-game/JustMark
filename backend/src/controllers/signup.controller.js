const User= require("../models/user.model.js")
const bcrypt= require("bcryptjs")


async function handleSignUp(req,res){
    const {userName, email, password}= req.body;

    if(!userName || !email || !password){
        return res.status(400).json({
            msg:"Fill all the credentials"
        })
    }

    try {

        const existingUser= await User.findOne({email:email});

        if(existingUser){
            return res.status(400).json({
                msg:"User with this email already exist"
            })
        }

        const saltrounds= 10;
        const hashpassword= await bcrypt.hash(password,saltrounds)

        const user= await User.create({
            userName,
            email,
            password: hashpassword,
        })

        return res.status(200).json({
            msg:"User created",
            user
        })


    } catch (error) {
        console.log("error creating user",error)
        return res.status(500).json({
            msg:"internal server error"
        })
    }
}

module.exports={
    handleSignUp,
}