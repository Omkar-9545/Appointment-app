const mongoose = require("mongoose");

const docSchema = mongoose.Schema({
    userId: {
        type: String
    },
    firstName: {
        type: String,
        require:[true,'first name is required']
    },
    lastName: {
        type: String,
        require:[true,'last name is required']
    },
    phone: {
        type: String,
        require:[true,'phone number is required']
    },
    email: {
        type: String,
        require:[true,'email is required']
    },
    status: {
        type: String ,
        default: "pending"
    },
    specialization: {
        type: String,
        require:[true,'specialization is required']
    },
    experience: {
        type: Number,
        require:[true,'experience is required']
    },
    timings: {
        type: Array
    }
}, { timestamps: true });

const Doctor = new mongoose.model("Doctor", docSchema);

module.exports = Doctor;