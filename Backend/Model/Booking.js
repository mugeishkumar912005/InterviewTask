const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    user: {
        type: String,  
        required: true
    },
    bus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bus",
        required: true
    },
    status: {
        type: String,
        enum: ["Booked", "Cancelled"],
        default: "Booked"
    }
});

module.exports = mongoose.model("Booking", BookingSchema);
