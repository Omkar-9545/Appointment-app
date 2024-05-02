const mongoose = require("mongoose");

const city3Schema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
});

const Sanhospital = new mongoose.model("Sanhospital", city3Schema);

module.exports = Sanhospital;