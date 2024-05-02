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

module.exports = hospitals2;