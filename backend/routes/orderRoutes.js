const express = require("express");
const router = express.Router();
const { Protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const { createOrder, getOrders, myOrders, updateOrderStatus } = require("../controllers/orderController");

// Create a new order
router.route("/").post(Protect, createOrder).get(Protect, admin, getOrders);
router.route("/myorders").get(Protect, myOrders); // Get orders for the logged-in user

router.route("/:orderId/status").put(Protect, admin, updateOrderStatus);

module.exports = router;
