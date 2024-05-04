const mongoose = require('mongoose');
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

    notification: {
        type: Array,
        default:[]
    },
    seenNotification: {
        type: Array,
        default:[]
    }
    
});

//creating the token(jwt)
userSchema.methods.generateToken = async function () { 
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
            isDoctor: this.isDoctor,
            notification: this.notification,
            seenNotification: this.seenNotification
        },
        process.env.JWT_SECRET,
        {
         expiresIn:"3d",    
        }
        );
    } catch (error) {
        console.log(error);
    }
};


//define model and collection name
const User = new mongoose.model("User", userSchema);

module.exports = User;