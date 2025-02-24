const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");

async function handleLogin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    try {
        const user = await User.findOne({email: email });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) {
            return res.status(400).json({ msg: "Wrong password" });
        }

        return res.status(200).json({
            msg: "User logged in successfully",
            userName: user.userName,  
            email: user.email
        });

    } catch (error) {
        console.log("Error logging in the user", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

module.exports = { handleLogin };
