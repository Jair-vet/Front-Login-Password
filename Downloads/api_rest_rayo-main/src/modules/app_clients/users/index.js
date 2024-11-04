const express = require("express");
const authRoutes = require("./routes/auth.routes");
const clientRoutes = require("./routes/clients.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/clients", clientRoutes);

module.exports = router;
