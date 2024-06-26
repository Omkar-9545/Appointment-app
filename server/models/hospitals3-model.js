const mongoose = require("mongoose");

const city3Schema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    doctors: { type: Array, required: true },
    insurance: { type: Array, required: true },
    govtScheme: { type: Array, required: true },
});

const Sanhospital = new mongoose.model("Sanhospital", city3Schema);

module.exports = Sanhospital;