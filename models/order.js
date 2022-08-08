const mongoose = require("mongoose")
const uuid = require("uuid");

const OrderSchema = new mongoose.Schema(
    {
        _id: { type: String, default: uuid.v1 },
        user_id: { type: String, required: true },
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        phone: { type: String },
        email: { type: String },
        address: { type: String, required: true },
        order_status: { type: String, default: "pending" },
        description: { type: String },
        appointments: [
            {
                appointment_date: { type: Date },
                preferred_time: { type: String },
                appointment_type: { type: String },
                appointment_status: { type: String },
                assigned_to: { type: String }
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);