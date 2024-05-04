const Doctor = require("../models/doctor-model");
const User = require("../models/user-model");


const docController = async(req,res) => {
    try {
        const { firstName, lastName, phone, email, specialization, experience } = req.body;
        
        if(experience < 0){
            return res.status(400).json({ message: "Please fill in proper details" ,success:false});
        }
        
        await Doctor.create({ firstName, lastName, phone, email, specialization, experience , status: 'pending' });

        //getting the admin to notify about the request of the doctor
        const adminUser = await User.findOne({ isAdmin: true });
        if (!adminUser) {
            return res.status(404).json({ message: "Cannot find admin user!" ,success:false});
        }
        const notification = adminUser.notification;
        const docId = await Doctor.findOne({ email: email });
        notification.push({
            type: 'Applying for doctor account',
            message: `${firstName} ${lastName} is requesting for a doctor account`,
            data: {
                doctorId: `${docId._id}`,
                name: `${firstName} ${lastName }`,
                onClickPath: '/admin/doctors'
            }
        });

        const updatedUser = await User.findByIdAndUpdate(adminUser._id, { notification });
        res.status(201).json({ message: "Doctor account applied successfully!" ,data:updatedUser.notification,success:true});
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error while applying for doctor" ,success:false});
    }
}

//handle all the notification
const getNotification = async(req,res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        const seenNotification = user.seenNotification;
        const notification = user.notification;
        seenNotification.push(...notification);
        user.notification.length = 0;
        user.seenNotification = notification;
        const updatedUser = await User.findByIdAndUpdate(req.body.userId, { notification, seenNotification }).select({password:0});
        res.status(200).json({
            message: "Fetched all notification successfully",
            data: {
                pendingnotification: updatedUser.notification,
                seenNotification: updatedUser.seenNotification
            },
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching all notification", error ,success:false});
    }
}

module.exports = { docController, getNotification };