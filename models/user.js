const mongoose = require("mongoose")
const uuid = require("uuid");

const userSchema = new mongoose.Schema(
    {
        _id: { type: String, default: uuid.v1 },
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
