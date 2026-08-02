const express = require("express");
const { createOrder, verifyPayments } = require("../controllers/paymentController.js");
const router = express.Router();


router.post("/order",createOrder);
router.post("/verify",verifyPayments);

module.exports =router;