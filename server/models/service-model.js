const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
});

const Service = new mongoose.model("Service", serviceSchema);

module.exports = Service;
