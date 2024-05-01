const mongoose = require("mongoose");

//const URL = "mongodb://127.0.0.1:27017/appointmentapp";

const URL = process.env.MONGODB_URL;

// mongoose.connect(URL);
const connectDB = async () => {
    try {
        await mongoose.connect(URL);
        console.log("Connection to the database is successful");
    } catch (error) {
        console.log("Database connection failed");
        console.log(error);
        process.exit(0);
    }
};

module.exports = connectDB;