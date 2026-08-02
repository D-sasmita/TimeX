const express = require("express");
const router = express.Router();
const { Protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const { getadminStats } = require("../controllers/analyticsController.js");
//console.log("Analytics routes loaded");
router.get("/", Protect, admin, getadminStats);

module.exports = router;