const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
    userId: {
        type: String,
        require: [true, 'user id is required']
    },
    doctorId: {
        type: String,
        require: [true, 'doctor id is required']
    },
    userInfo: {
        type: Object,
        require:[true,'user info is required']
    },
    date: {
        type: String,
        require: [true, 'date is required']
    },
    startTime: {
        type: String,
        require: [true, 'start time is required']
    },
    endTime: {
        type: String,
        require: [true, 'end time is required']
    },
    status: {
        type: String,
        require: [true],
        default: 'pending'
    }
}, { timestamps: true });


const appointmentModel = new mongoose.model('Appointment', appointmentSchema);

module.exports = appointmentModel;