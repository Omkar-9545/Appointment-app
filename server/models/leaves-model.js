const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
    doctorId: {
        type: String,
        require: [true, 'user id is required']
    },
    startDate: {
        type: String,
        require: [true, 'date is required']
    },
    endDate: {
        type: String,
        require: [true, 'days is required']
    },
},{ timestamps: true });

const Leave = new mongoose.model("Leave", leaveSchema);

module.exports = Leave;