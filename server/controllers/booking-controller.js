const appointmentModel = require("../models/appointment-model");
const Doctor = require("../models/doctor-model");
const User = require("../models/user-model");
const Leave = require("../models/leaves-model");
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

const applyLeaves = async(req,res) => {
    try {
        const id = req.params.id
        const fromdate = moment(req.body.date, "DD-MM-YYYY").toISOString()
        const toDate = moment(req.body.date, "DD-MM-YYYY").add(req.body.days, 'days').toISOString()
        const newleave = await Leave.create({ doctorId: id, startDate: fromdate, endDate: toDate });
        return res.status(201).json({ message: "Application for leave successful", success: true, data: newleave });
    } catch (error) {
        return res.status(500).json({ message: "Applying for leaves failed", success: false });
    }
}

const checkAvailablility = async (req, res) => {
    try {
        const doctorId = req.body.doctorId
        const timings = req.body.apptime
        const date = moment(req.body.appdate,"DD-MM-YYYY").toISOString()

        const appointments = await appointmentModel.find({ doctorId }, { date: 1, _id: 0, time: 1 });
        const doctime = await Doctor.findOne({ _id: doctorId }, { startTime: 1, endTime: 1 });
        
        const stTime = moment(doctime.startTime, "HH:mm").toISOString()
        const edTime = moment(doctime.endTime, "HH:mm").subtract(0.5, 'hours').toISOString();
        
        let doesExist = appointments.filter((obj) => { return obj.date == date })
        
        let ans = [];
        
        for (let i = 0; i < 33; i++){
            const time = moment(timings[i], "HH:mm A").toISOString()
            if(!doesExist.length && time >= stTime && time <= edTime){ans.push({ reason: "A", success: true });}
            else if (!(time >= stTime && time <= edTime)) {
                ans.push({ reason: "T", success: false });
            }
            else {
                let doesappExist = appointments.filter((obj) => { return obj.time == time })
                
                if (doesappExist.length) {
                    ans.push({ reason: "B", success: false });
                } else {
                    ans.push({ reason: "A", success: true });  
                }
            }
        } 
        return res.status(200).json({ message: "Fetched all availability", suc: true, data: ans });   
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error while checking availability", suc: false, error });
    }
}

const getAppointment = async (req, res) => {
    try {
        const userId = req.params.id
        const appointments = await appointmentModel.find({ userId }, {});
        if (appointments.length > 0) {
            return res.status(200).json({ message: "All appointments fetched successfully", success: true, data: appointments });
        }
        return res.status(200).json({ message: "No appointments found", success: false, data: [] });
    } catch (error) {
        return res.status(500).json({ message: "Error while getting all the appointments", success: false, error });
    }
}

const updateAppointment = async(req,res) => {
    try {
        const { appointmentsId,status } = req.body
        const response = await appointmentModel.findByIdAndUpdate(appointmentsId, { status });
        const user = await User.findOne({ _id: response.userInfo._id }); 
        const notification = user.notification
        notification.push({
            type: 'Status Updated',
            message: `Your appointment has been ${status}`
        });
        await User.findByIdAndUpdate(user._id, { notification });
        return res.status(200).json({ message: "Appointment status updated", success: true });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error while updating status", success: false, error });
    }
}

module.exports = { getDocInfo, checkAvailablility, getAppointment, updateAppointment, applyLeaves };