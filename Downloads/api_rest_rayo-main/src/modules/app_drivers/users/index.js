const express = require("express");
const authRoutes = require("./routes/auth.routes");
const driverRoutes = require("./routes/drivers.routes")

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/drivers", driverRoutes);


module.exports = router;
