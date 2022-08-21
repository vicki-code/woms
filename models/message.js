const mongoose = require("mongoose")
const uuid = require("uuid");

const MessageSchema = new mongoose.Schema(
    {
        _id: { type: String, default: uuid.v1 },
        name: { type: String, required: true },
        phone: { type: String },
        email: { type: String },
        message: { type: String }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);