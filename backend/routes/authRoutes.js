const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUsers } = require("../controllers/authController");
const { Protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/users",Protect,admin, getUsers);

module.exports = router;
