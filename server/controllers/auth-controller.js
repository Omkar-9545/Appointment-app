const User = require("../models/user-model")
const bcrypt = require("bcryptjs");
// HOME LOGIC //

const home = async (req, res) => {
    try {
        res.status(200).send({ message: `Welcome to the home page of application by Omki using controller` });
    } catch (error) {
        console.log(error);
    }
};

// REGISTER LOGIC //

const register = async (req, res) => {

    try {
        //console.log(req.body);
        const { name, email, password } = req.body;

        const userExist = await User.findOne({ email});
        if (userExist) {
            return res.status(400).json({ message: "Email Already Exists!" ,success:false});
        }

        // const salt = 10
        // const hashed_password = await bcrypt.hash(password, salt);

        const userCreated = await User.create({ name, email, password});
        res.status(201).json(
            {
                message: "Registration Successful",
                token: await userCreated.generateToken(),
                userId: userCreated._id.toString(),
                success:true,
            }
        );
        
    } catch (err) {
        
        res.status(500).json({ message: "Registration Page not Found" ,success:false});
    }
};

// LOGIN LOGIC //

const login = async(req,res) => {
    try {
        const { email, password } = req.body;
        //check if the user exists
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(404).json({ message: "Invalid Credentials!!" ,success:false});
        }
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(userExist.password, salt);
        userExist.password = hashed_password;
        // if exists then
        const user = await bcrypt.compare(password, userExist.password)
        if (user) {
            res.status(200).json(
                {
                    message: "Login Successful",
                    token: await userExist.generateToken(),
                    userId: userExist._id.toString(),
                    success:true,
                }
            ); 
        } else {
            res.status(401).json({message:"Invalid Email or Password"});
        }


    } catch (error) {
        res.status(500).json({ message: "Login Page not Found" ,error});
    }
}

// auth logic
const authctrl = async(req,res) => {
    try {
        const userData = req.user;
        // console.log(userData)
        res.status(200).json({userData});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "auth error",
            success: false,
            error
        });
    }
}

module.exports = { home, register, login,authctrl };