const  Sanhospital = require("../models/hospitals3-model")

const hospitals3 = async (req, res) => {
    try {
        const response = await Sanhospital.find();
        if (!response) {
            res.status(404).json({ message: "No hospitals found!" })
            return;
        }
        res.status(200).json({ message: response });
    } catch (error) {
        console.log(` Sangli Hospitals data list:${error}`);
    }
};

module.exports = hospitals3;