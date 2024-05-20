const User = require("../models/user-model")
const bcrypt = require("bcryptjs");
const appointmentModel = require("../models/appointment-model");
const Doctor = require("../models/doctor-model");
const Substitute = require("../models/substitute-model");
const moment = require("moment")
// HOME LOGIC //

const home = async (req, res) => {
    try {
        res.status(200).send({ message: `Welcome to the home page of application by Omki` });
    } catch (error) {
        console.log(error);
    }
};

// REGISTER LOGIC //

const register = async (req, res) => {

    try {
        const { name, email, password, phone} = req.body;

        const userExist = await User.findOne({ email});
        if (userExist) {
            return res.status(400).json({ message: "Email Already Exists!" ,success:false});
        }
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(password, salt);
        
        const userCreated = await User.create({ name, email, password:hashed_password, phone });

        res.status(201).json(
            {
                message: "Registration Successful",
                token: await userCreated.generateToken(),
                userId: userCreated._id,
                success:true,
            }
        );
        
    } catch (err) {
        
        res.status(500).json({ message: "Registration Error" ,success:false});
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
        
        res.status(500).json({
            message: "auth error",
            success: false,
            error
        });
    }
}

const bookCtrl = async(req,res) => {
    try {
        req.body.date = moment(req.body.date, 'DD-MM-YYYY').toISOString()
        req.body.time = moment(req.body.time, 'HH:mm').toISOString()
        req.body.status = 'pending';
        await appointmentModel.create(req.body);
        const user = await User.findOne({ _id: req.body.userId });
        const notification = user.notification
        notification.push({
            type: 'New-Appointment-request',
            message: `A new appointment request from ${req.body.userInfo.name}`,
            onClickPath: "/user/appointments"
        });
        const newUser = await User.findByIdAndUpdate(req.body.userId, { notification }).select({ password: 0 });
        res.status(201).json({ message: "Appointment sucessful", success: true,data:newUser});

    } catch (error) {
        res.status(500).json({ message: "Error while booking appointment", success: false, error });
    }
}

const substituteDoc = async (req, res) => {
    try {
        const id = req.params.id
        const userId = req.body.userId
        const doctor = await Doctor.findOne({ userId });
        const substitutes = [];
        substitutes.push(doctor)
        const reqdoc = await Doctor.findOne({ userId: id });
        const subs = await Substitute.create({ substitutes, doctorId: reqdoc._id });
        return res.status(201).json({ message: "Added substitute doctor successfully", success: true, data: subs });
    } catch (error) {
        return res.status(500).json({ message: "Error while fetching substitute doctors", success: false, error });
    }
}

module.exports = { home, register, login, authctrl, bookCtrl, substituteDoc };