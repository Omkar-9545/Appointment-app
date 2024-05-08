const User = require("../models/user-model");

const getAllUser = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No Users Found", success: false });
        }
        return res.status(200).json({ success: true, data: users });
    } catch (error) {
        next(error)
    }
}

module.exports = getAllUser;