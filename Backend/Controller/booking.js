const Booking = require("../Model/Booking");
const Bus = require("../Model/Bus");

const BookBus = async (req, res) => {
    try {
        const { busId } = req.body;
        const userEmail = req.user.email; 

        if (!busId) return res.status(400).json({ Msg: "Bus ID is required" });

        const busExists = await Bus.findById(busId);
        if (!busExists) return res.status(404).json({ Msg: "Bus not found" });

        const existingBooking = await Booking.findOne({ user: userEmail, bus: busId, status: "Booked" });
        if (existingBooking) {
            return res.status(400).json({ Msg: "You have already booked this bus" });
        }

        const newBooking = await Booking.create({
            user: userEmail,
            bus: busId,
            status: "Booked"
        });

        return res.status(201).json({ Msg: "Bus booked successfully", Data: newBooking });

    } catch (err) {
        return res.status(500).json({ Msg: "Server Error", error: err.message });
    }
};

const CancelBooking = async (req, res) => {
    try {
        const { busId } = req.body;
        const userEmail = req.user.email;  

        const booking = await Booking.findOne({ _id: busId, user: userEmail, status: "Booked" });
        if (!booking) {
            return res.status(404).json({ Msg: "Booking not found" });
        }

        booking.status = "Cancelled";
        await booking.save();

        return res.status(200).json({ Msg: "Booking cancelled successfully" });

    } catch (err) {
        return res.status(500).json({ Msg: "Server Error", error: err.message });
    }
};

module.exports = { BookBus, CancelBooking };
