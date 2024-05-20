const mongoose = require("mongoose");

const city2Schema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    doctors: { type: Array, required: true },
    insurance: { type: Array, required: true },
    govtScheme: { type: Array, required: true },
});

const Gadhospital = new mongoose.model("Gadhospital", city2Schema);

module.exports = Gadhospital;