const appointmentModel = require("../models/appointment-model");
const Doctor = require("../models/doctor-model");
const moment = require("moment")

const getDocInfo = async (req, res) => {
    try {
        const id = req.params.id
    const response = await Doctor.findOne({ _id: id }, {})
    if (!response) {
        return res.status(404).json({ message: "Couldn't Find the Doctor", success: false, });
    }
    return res.status(200).json({ message: "Doctor data fetched successfully", success: true, data: response });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Couldn't get the data" });
    }
    
}

const checkAvailablility = async (req, res) => {
    try {
        const date = moment(req.body.date, 'DD-MM-YYYY').toISOString()
        const fromTime = moment(req.body.time, 'HH:mm').subtract(0.05,'hours').toISOString()
        const toTime = moment(req.body.time, 'HH:mm').add(0.5,'hours').toISOString()
        const doctorId = req.body.doctorId
        const appointments = await appointmentModel.find({
            doctorId,
            date,
            time: {
                $gte: fromTime, $lte: toTime
            }
        })
        if (appointments.length > 0) {
            return res.status(400).json({ message: "Appointment is not available at this time", success: false });
        } else {
            return res.status(200).json({ message: "Appointment available", success: true });
        }
    } catch (error) {
        res.status(500).json({ message: "Error while checking availability", success: false, error });
    }
}

module.exports = { getDocInfo, checkAvailablility };