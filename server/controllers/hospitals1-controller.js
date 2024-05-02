const  Kolhospital = require("../models/hospitals1-model")

const hospitals1 = async (req, res) => {
    try {
        const response = await Kolhospital.find();
        if (!response) {
            res.status(404).json({ message: "No hospitals found!" })
            return;
        }
        res.status(200).json({ message: response });
    } catch (error) {
        console.log(` Kolhapur Hospitals data list:${error}`);
    }
};

module.exports = hospitals1;