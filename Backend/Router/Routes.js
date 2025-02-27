const express = require("express");
const router = express.Router();
const { Auth, authorizeRoles } = require("../MiddleWare/Auth.js");
const UserController = require("../Controller/User");
const BusController = require("../Controller/Bus");
const BookController= require("../Controller/booking.js");

router.post("/Login", UserController.Login);
router.post("/Add", UserController.AddUser);
router.post("/AddBus", Auth, authorizeRoles("Driver"), BusController.AddBus);

router.patch("/Update/:BusNo", Auth, authorizeRoles("Driver"), BusController.updateBus);

router.get("/Search", Auth, authorizeRoles("User"), BusController.SearchBus);

router.post("/book", Auth, authorizeRoles("User"),BookController.BookBus);
router.post("/cancel", Auth, authorizeRoles("User"), BookController.CancelBooking);


module.exports = router;
