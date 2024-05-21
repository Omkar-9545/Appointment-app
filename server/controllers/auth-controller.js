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

const getSameDoc = async(req,res) => {
    try {
        const id = req.params.id
        const doctortype = await Doctor.findOne({ userId: id });
        let alldoc = await Doctor.find({ specialization: doctortype.specialization, hospital: doctortype.hospital });
        const result = alldoc.filter((curDoc) => {
            if (curDoc.userId != id)
                return curDoc;
        })

        if (result.length) {
            return res.status(200).json({ message: "All doctor of same type fetched successfully", success: true, data: result });
        } else {
            return res.status(200).json({ message: "There are no doctor of same type in the hospital", success: true });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error while getting same type doctor", success: false, error });
    }
}

const substituteDoc = async (req, res) => {
    try {
        const id = req.params.id
        const userId = req.body.userId
        const reqdoc = await Doctor.findOne({ userId: id });
        const doctor = await Doctor.findOne({ userId });
        const isPresent = await Substitute.findOne({ doctorId: reqdoc._id }, { substitutes: 1, _id: 0 });
        var tmp = false, name = "";
        if (isPresent) {
            isPresent.substitutes.map((curSub) => {
                if (curSub.userId == userId) {
                    tmp = true;
                    name = curSub.firstName
                }
            });
            if (tmp) {
                return res.status(400).json({ message: `Dr. ${name} is already your substitute doctor`, success: false });
            }
        }
        
        const substitutes = [];
        substitutes.push(doctor)
        const subs = await Substitute.create({ substitutes, doctorId: reqdoc._id });
        return res.status(201).json({ message: "Added substitute doctor successfully", success: true, data: subs });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error while adding substitute doctors", success: false, error });
    }
}

const getSubstitute = async (req, res) => {
    try {
        const docId = req.params.id
        const substitutes = await Substitute.findOne({ doctorId: docId }, { substitutes: 1 });
        if (substitutes) {
            return res.status(200).json({ message: "Fetched all substitute doctors successfully", success: true, data: substitutes.substitutes });
        }
        else {
            return res.status(200).json({ message: "No substitute doctors found!", success: false ,data:[]});
        }
    } catch (error) {
        // console.log(error)
        res.status(500).json({ message: "Error while getting substitute doctors", success: false, error });
    }
}

const getUserAppointment = async (req, res) => {
    try {
        const id = req.params.id
        const appointments = await appointmentModel.find({ 'userInfo._id': id });
        if (appointments.length) {
            return res.status(200).json({ message: "Fetched all user appointments successfully", success: true, data: appointments });
        }
        else {
            return res.status(200).json({ message: "No appointments found", success: false, data: [] });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error while getting user appointments", success: false });
    }
}

module.exports = { home, register, login, authctrl, bookCtrl, substituteDoc, getSameDoc, getSubstitute, getUserAppointment };