const Bus = require("../Model/Bus");


const AddBus = async (req, res) => {
    const { BusName, BusNo, Type, Bording, Droping, DriverName, DriverNo } = req.body;

    try {
        if (!BusName || !BusNo || !Type || !Bording || !Droping || !DriverName || !DriverNo) {
            return res.status(400).json({ Msg: "All fields are required" });
        }

        if (!Array.isArray(Bording) || !Array.isArray(Droping)) {
            return res.status(400).json({ Msg: "Bording and Droping should be arrays" });
        }

        const New_Bus = await Bus.create({
            BusName,
            BusNo,
            Type,
            Bording,
            Droping,
            DriverName,
            DriverNo,
        });

        return res.status(201).json({ Msg: "Successfully added", Data: New_Bus });

    } catch (err) {
        return res.status(500).json({ Msg: "Server Error", error: err.message });
    }
};
const updateBus = async (req, res) => {
    const { BusNo } = req.params;
    const { BusName, Type, Bording, Droping, DriverName, DriverNo } = req.body;

    try {
        const Find_Bus = await Bus.findOne({ BusNo });

        if (!Find_Bus) {
            return res.status(400).json({ Msg: "Bus Not Found" });
        }
        const Update_Bus = await Bus.updateOne(
            { BusNo },
            {
                $set: {
                    BusName,
                    Type,
                    Bording,
                    Droping,
                    DriverName,
                    DriverNo,
                },
            }
        );

        if (Update_Bus.modifiedCount === 0) {
            return res.status(400).json({ Msg: "Cannot update the bus details" });
        }

        return res.status(200).json({ Msg: "Updated Successfully", Data: Update_Bus });

    } catch (err) {
        return res.status(500).json({ Msg: "Server Error", error: err.message });
    }
};
const SearchBus = async (req, res) => {
    const { BusName, Bording, Droping, Type } = req.query; 

    try {
        let filter = {};

        if (BusName) filter.BusName = BusName;
        if (Type) filter.Type = Type;
        if (Bording) filter.Bording = { $in: Bording.split(",") }; 
        if (Droping) filter.Droping = { $in: Droping.split(",") };

        const Buses = await Bus.find(filter);

        if (!Buses.length) {
            return res.status(404).json({ Msg: "No buses found matching the criteria" });
        }

        return res.status(200).json({ Msg: "Buses found", Data: Buses });
    } catch (err) {
        return res.status(500).json({ Msg: "Server Error", error: err.message });
    }
};

module.exports = { AddBus,updateBus,SearchBus};
