const User = require("../models/user-model");
const Doctor = require("../models/doctor-model");
const Kolhospital = require("../models/hospitals1-model");
const Gadhospital = require("../models/hospitals2-model");
const Sanhospital = require("../models/hospitals3-model");

const getAllUser = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No Users Found", success: false });
        }
        return res.status(200).json({ success: true, data: users });
    } catch (error) {
        next(error)
    }
}

const getAllDoc = async(req,res) => {
    try {
        const doctors = await Doctor.find({},{password:0});
        if (!doctors || doctors.length === 0) {
            return res.status(404).json({ message: "No Doctors among the users", success: false });
        }
        return res.status(200).json({ data: doctors, success: true });
    } catch (error) {
        next(error)
    }
}

const getUserbyId = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({ _id: id }, { password: 0 });
        return res.status(200).json({ data: data, success: true });
        
    } catch (error) {
        console.log(error)
    }
    
}

const updateUser = async(req, res) => {
    try {
        const id = req.params.id;
        const newData = req.body;

        const newUser = await User.updateOne({ _id: id }, {
            $set: newData,
        });
        return res.status(200).json({ message: "User updated successfully", success: true ,data:newUser});
    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async(req,res) => {
    try {
        const id = req.params.id;
        await User.deleteOne({ "_id": id });
        return res.status(200).json({ message: "User deleted successfully",success:true});
    } catch (error) {
        // next(error);
        console.log(error)
    }
}

//push all notification into seenNotification
const getNotification = async(req,res) => {
    try {
        const id = req.params.id
        const user = await User.findOne({ _id: id });
        const seenNotification = user.seenNotification;
        const notification = user.notification;
            seenNotification.push(...notification);
            user.notification.length = 0;
        const updatedUser = await User.findByIdAndUpdate(id, { notification, seenNotification }).select({ password: 0 });
            res.status(200).json({
                message: "Pushed all notification successfully",
                data: {
                    notification: updatedUser.notification,
                    seenNotification: updatedUser.seenNotification
                },
                success: true
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error pushing all notification", error ,success:false});
    }
}

const seeNotification = async(req,res) => {
    try {
        const id = req.params.id
        const user = await User.findOne({ _id: id });
        const notification = user.notification;
        const seenNotification = user.seenNotification
        
        if (notification && seenNotification) {
            res.status(200).json({
                message: "Fetched all notification succesfully", data: {
                    unread: notification,
                    read: seenNotification,
                },success:true
            });
        }
        
    } catch (error) {
        // console.log(error);
        res.status(400).json({message:"Error in fetching notification",error})
    }
}

const deleteNotification = async(req,res) => {
    try {
        const id = req.params.id
        const user = await User.findOne({ _id: id });
        const seenNotification = user.seenNotification
        seenNotification.length = 0;
        // console.log(seenNotification)
        const updatedUser = await User.findByIdAndUpdate(id, { seenNotification }).select({ password: 0 });
        res.status(201).json({
            message: "Deleted all notification successfully", data: {
                read: updatedUser.seenNotification,
                unread: updatedUser.notification
            },success:true
        });
    } catch (error) {
        res.status(400).json({message:"Error deleting all notification",error})
    }
}

const approveDoc = async(req,res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;
        const doc = await Doctor.findOneAndUpdate({ _id: id }, { status:'approved' });
        
        const city = doc.city;
        if (city.toLowerCase() == 'kolhapur') {
            const qry = await Kolhospital.findOne({ name: doc.hospital }, {});
            const arr = qry.doctors;
            const id = qry._id;
            arr.push(doc)
            await Kolhospital.findByIdAndUpdate(id, { doctors: arr });
        }
        else if (city.toLowerCase() == 'gadhinglaj') {
            const qry1 = await Gadhospital.findOne({ name: doc.hospital }, { doctors: 1 });
            const arr = qry1.doctors;
            const id = qry1._id;
            arr.push(doc)
            await Gadhospital.findByIdAndUpdate(id, { doctors: arr });
        }
        else if (city.toLowerCase() == 'sangli') {
            const qry2 = await Sanhospital.findOne({ name: doc.hospital }, { doctors: 1 });
            const arr = qry2.doctors;
            const id = qry2._id;
            arr.push(doc)
            await Sanhospital.findByIdAndUpdate(id, { doctors: arr });
        }
        const user = await User.findOne({ _id: doc.userId });
        const notification = user.notification;
        notification.push({
            type: "doctor-account-request-updated",
            message: `Your doctor account is ${status}`,
            onClickPath: "/notification"
        });
        // console.log(notification)
        if (status === 'approved') {
            await User.findByIdAndUpdate(doc.userId, { isDoctor: true ,notification});
        }
        res.status(200).json({ success: true, message: "Account status updated successfully." });
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getAllUser, deleteUser,getNotification,seeNotification,deleteNotification,getUserbyId,updateUser,getAllDoc,approveDoc};