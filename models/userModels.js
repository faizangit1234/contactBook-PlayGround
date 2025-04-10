const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "please provide an email"],
        unique: [true, "email is already registered"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
        trim: true,
    }
}, { timeStamps: true })

module.exports = mongoose.model("User", userSchema)