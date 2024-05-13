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
            const l2 = await Gadhospital.findOne({ name: hospital }, { phone: 1 });
            if (!l2) {
                return res.status(404).json({ message: "No such hospital exists", success: false });
            }
        }
        else if(city.toLowerCase() == 'sangli'){
                const l3 = await Sanhospital.findOne({ name: hospital }, { phone: 1 });
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

const docProfile = async(req,res) => {
    try {
        const id = req.params.id
        const response = await Doctor.findOne({ userId: id });
        if (!response) {
            return res.status(404).json({ message: "No such doctor found", success: false });
        }
        return res.status(200).json({ message: "Fetched doctor data successfully", success: true, data: response });
    } catch (error) {
        res.status(500).json({ message: "Error getting doc profile", error, success: false });
    }
}

const updateProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const existData = await Doctor.findOne({ userId: id }, {});
        if (data.city || data.hospital) {
            if (data.city && !data.hospital) {
                ct = data.city.toLowerCase();
                hospital = existData.hospital;
            }
            else if (!data.city && data.hospital) {
                ct = existData.city.toLowerCase();
                hospital = data.hospital;
            }
            else {
                ct = data.city.toLowerCase();
                hospital = data.hospital;
            }
        // checking the validity of the cities and the hospitals if entered
        if (ct != 'kolhapur') {
                if (ct.toLowerCase() != 'gadhinglaj') {
                    if (ct != 'sangli') {
                        return res.status(404).json({ message: "City not found", success: false });
                    }
                }
            }

        if (ct == 'kolhapur'){
            const l1 = await Kolhospital.findOne({ name: hospital }, {});
            if (!l1) {
                return res.status(404).json({ message: "No such hospital exists", success: false });
            }
            const updatedDoc = await Doctor.findOneAndUpdate({ userId : id }, {
                $set: data,
            });
            let arr = l1.doctors
            arr.push(updatedDoc)
            await Kolhospital.findOneAndUpdate({ name: hospital }, { doctors: arr });
            return res.status(201).json({ message: "Updated  doctor profile successfully ", success: true, data: updatedDoc });
        }
        else if (ct == 'gadhinglaj') {
            const l2 = await Gadhospital.findOne({ name: hospital }, {});
            if (!l2) {
                return res.status(404).json({ message: "No such hospital exists", success: false });
            }
            const updatedDoc = await Doctor.findOneAndUpdate({ userId : id }, {
                $set: data,
            });
            let arr = l2.doctors
            arr.push(updatedDoc)
            await Gadhospital.findOneAndUpdate({ name: hospital }, { doctors: arr });
            return res.status(201).json({ message: "Updated  doctor profile successfully ", success: true, data: updatedDoc });
        }
        else if(ct == 'sangli'){
                const l3 = await Sanhospital.findOne({ name: hospital }, {});
                if (!l3) {
                    return res.status(404).json({ message: "No such hospital exists", success: false });
            }
            const updatedDoc = await Doctor.findOneAndUpdate({ userId : id }, {
                $set: data,
            });
            let arr = l3.doctors
            arr.push(updatedDoc)
            await Sanhospital.findOneAndUpdate({ name: hospital }, { doctors: arr });
            return res.status(201).json({ message: "Updated  doctor profile successfully ", success: true, data: updatedDoc });
        }

        } else {
            const updatedDoc = await Doctor.findOneAndUpdate({ userId : id }, {
                $set: data,
            });
            return res.status(201).json({ message: "Updated  doctor profile successfully ", success: true, data: updatedDoc });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error while updating doc profile", success: false, error });
    }
}

module.exports = { docController, docProfile, updateProfile };