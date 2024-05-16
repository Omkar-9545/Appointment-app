const Doctor = require("../models/doctor-model");

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

module.exports = getDocInfo;