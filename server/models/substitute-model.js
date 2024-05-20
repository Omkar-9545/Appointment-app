const mongoose = require("mongoose")

const substituteSchema = mongoose.Schema({
    doctorId: {
        type: String,
        require: [true, 'doctor id is required']
    },
    substitutes: {
        type: Array,
        require: [true, 'substitutes are required']
    },
});

const Substitute = mongoose.model("Substitute", substituteSchema);

module.exports = Substitute;