const Doctor = require("../models/doctor-model");
const User = require("../models/user-model");
const Kolhospital = require("../models/hospitals1-model");
const Sanhospital = require("../models/hospitals3-model");
const Gadhospital = require("../models/hospitals2-model");

const docController = async(req,res) => {
    try {
        const { firstName, lastName, phone, email, specialization, experience, startTime, endTime, city, hospital } = req.body;
        const userId = req.params.id
        const ct = city.toLowerCase();
        if(experience < 0){
            return res.status(400).json({ message: "Please fill in proper details" ,success:false});
        }

        if (ct != 'kolhapur') {
            if (ct.toLowerCase() != 'gadhinglaj') {
                if (ct != 'sangli') {
                    return res.status(404).json({ message: "City not found", success: false });
                }
            }
        }

        if (city.toLowerCase() == 'kolhapur'){
            const l1 = await Kolhospital.findOne({ name: hospital }, { phone: 1 });
            if (!l1) {
                return res.status(404).json({ message: "No such hospital exists", success: false });
            }
        }
        else if (city.toLowerCase() == 'gadhinglaj') {
            const l2 = await Sanhospital.findOne({ name: hospital }, { phone: 1 });
            if (!l2) {
                return res.status(404).json({ message: "No such hospital exists", success: false });
            }
        }
        else if(city.toLowerCase() == 'sangli'){
                const l3 = await Gadhospital.findOne({ name: hospital }, { phone: 1 });
                if (!l3) {
                    return res.status(404).json({ message: "No such hospital exists", success: false });
                }
            }
        await Doctor.create({ userId, firstName, lastName, phone, email, specialization, experience, startTime, endTime, city, hospital, status: 'pending' });

                //getting the admin to notify about the request of the doctor
                const adminUser = await User.findOne({ isAdmin: true });
                if (!adminUser) {
                    return res.status(404).json({ message: "Cannot find admin user!", success: false });
                }
                const notification = adminUser.notification;
                const docId = await Doctor.findOne({ email: email });
                notification.push({
                    type: 'Applying for doctor account',
                    message: `${firstName} ${lastName} is requesting for a doctor account`,
                    data: {
                        doctorId: `${docId._id}`,
                        name: `${firstName} ${lastName}`,
                        onClickPath: '/admin/doctors'
                    }
                });

                const updatedUser = await User.findByIdAndUpdate(adminUser._id, { notification });
                res.status(201).json({ message: "Doctor account applied successfully!", data: updatedUser.notification, success: true });
            }
     catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error while applying for doctor" ,success:false});
    }
}

module.exports =  docController;