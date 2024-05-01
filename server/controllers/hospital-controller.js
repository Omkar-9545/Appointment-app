const Service = require("../models/service-model")

const hospitals = async (req, res) => {
    try {
        const response = await Service.find();
        if (!response) {
            res.status(404).json({ message: "No hospitals found!" })
            return;
        }
        res.status(200).json({ message: response });
    } catch (error) {
        console.log(`Hospitals data list:${error}`);
    }
};

module.exports = hospitals;