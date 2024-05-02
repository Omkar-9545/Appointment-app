const Doctor = require("../models/doctor-model");
const User = require("../models/user-model");


const docController = async(req,res) => {
    try {
        const { firstName, lastName, phone, email, specialization, experience } = req.body;
        
        if(firstName && lastName && phone && email && specialization && experience){
            await Doctor.create({ firstName, lastName, phone, email, specialization, experience }, { status: 'pending' });
        }
        else {
            return res.status(400).json({ message: "Please fill all the data" });
        }
        //getting the admin to notify about the request of the doctor
        const adminUser = await User.findOne({ isAdmin: true });
        if (!adminUser) {
            return res.status(404).json({ message: "Cannot find admin user!" });
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

        await User.findByIdAndUpdate(adminUser._id, { notification });
        res.status(201).json({ message: "Doctor account applied successfully!" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error while applying for doctor" });
    }
}

module.exports = docController;