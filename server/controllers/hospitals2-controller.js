const  Gadhospital = require("../models/hospitals2-model")

const hospitals2 = async (req, res) => {
    try {
        const response = await Gadhospital.find();
        if (!response) {
            res.status(404).json({ message: "No hospitals found!" })
            return;
        }
        res.status(200).json({ message: response });
    } catch (error) {
        console.log(` Gadhinglaj Hospitals data list:${error}`);
    }
};

const getallDoc2 = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Gadhospital.findOne({ _id: id }, { doctors: 1 });
        if (!response) {
            res.status(404).json({ message: "No such field exists", success: false });
            return;
        }
        res.status(200).json({ message: "All doctors fetched successfully", success: true, data: response });
    } catch (error) {
        res.status(500).json({ message: "Error fetching all doctors in kolhapur", success: false, error });
    }
}

module.exports = { hospitals2, getallDoc2 };