const mongoose = require("mongoose");

const BusSchema = new mongoose.Schema({
    BusName: {
        type: String,
        required: true,
        trim: true
    },
    BusNo: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    Type: {
        type: String,
        required: true,
        enum: ["AC", "Non-AC", "Sleeper", "Seater"]
    },
    Bording: {
        type: [String],
        required: true
    },
    Droping: {
        type: [String],
        required: true
    },
    DriverName: {
        type: String,
        required: true,
        trim: true
    },
    DriverNo: {
        type: String,
        required: true,
        trim: true,
        match: [/^\d{10}$/, "Invalid phone number"]
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});

const Bus = mongoose.model("Bus", BusSchema);

module.exports = Bus;
