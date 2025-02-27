const mongoose = require("mongoose");

const User= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    Ph: {
        type: Number,
        required: true
    },
    Age: {
        type: Number,
        required: true
    },
    Role: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true
    }
});

const Users = mongoose.model('Users', User);
module.exports = { Users };
