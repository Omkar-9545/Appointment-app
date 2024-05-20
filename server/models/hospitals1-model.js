const mongoose = require("mongoose");

const city1Schema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    doctors: { type: Array, required: true },
    insurance: { type: Array, required: true },
    govtScheme: { type: Array, required: true },
});

const Kolhospital = new mongoose.model("Kolhospital", city1Schema);

module.exports = Kolhospital;