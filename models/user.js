const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullname: { type: String, required: [true, "Fullname is required!"] },
    username: { type: String, required: [true, "Username is required!"], unique: true },
    password: { type: String, required: [true, "Password is required!"] },
    email: { type: String, required: [true, "Email is required!"] },
    isAdmin: { type: Boolean },
    createAt: { type: Date, default: new Date() }
});

module.exports = mongoose.model("user", userSchema);