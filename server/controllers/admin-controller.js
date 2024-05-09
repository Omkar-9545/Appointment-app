const User = require("../models/user-model");

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
        const user = await User.findOne({ isAdmin: true});
        const seenNotification = user.seenNotification;
        const notification = user.notification;
        const userId = user._id;
            seenNotification.push(...notification);
            user.notification.length = 0;
        const updatedUser = await User.findByIdAndUpdate(userId, { notification, seenNotification }).select({ password: 0 });
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
        const user = await User.findOne({ isAdmin: true });
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
        const admin = await User.findOne({ isAdmin: true });
        const userId = admin._id;
        const seenNotification = admin.seenNotification
        
        seenNotification.length = 0;
        // console.log(seenNotification)
        const updatedUser = await User.findByIdAndUpdate(userId, { seenNotification }).select({ password: 0 });
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

module.exports = { getAllUser, deleteUser,getNotification,seeNotification,deleteNotification,getUserbyId,updateUser};