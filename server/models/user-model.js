const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//Define schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default:false,
    },
    isDoctor: {
        type: Boolean,
        default:false,
    },
    
});

//pre method to make password change easy and also hashing if the password
userSchema.pre("save", async function () {
    const user = this;
    if (!user.isModified('password')) {
        next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(user.password, salt);
        user.password = hashed_password;
    } catch (error) {
        next(error);
    }
});

//creating the token(jwt)
userSchema.methods.generateToken = async function () { 
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
        process.env.JWT_SECRET,
        {
         expiresIn:"1d",    
        }
        );
    } catch (error) {
        console.log(error);
    }
};

//method to compare passwds for login
userSchema.methods.cmp = async function (password) {
    try {
        return bcrypt.compare(password, this.password);

    } catch (error) {
        console.log(error);
    }
};

//define model and collection name
const User = new mongoose.model("User", userSchema);

module.exports = User;