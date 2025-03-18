const express = require("express");
const router = express.Router();
const { registerAdmin } = require("../controller/adminController");

router.post("/register-admin", registerAdmin);

module.exports = router;
