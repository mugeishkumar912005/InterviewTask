const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Routes=require('./Router/Routes')
app.use(bodyParser.json());
app.use(express.json());

const DbConnection = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/BusBooking');
        console.log("DB Connection Success");
    } catch (error) {
        console.error("Oops! Server Error: " + error);
    }
};

DbConnection();

app.set("view engine", "ejs");
app.use("/",Routes);
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
