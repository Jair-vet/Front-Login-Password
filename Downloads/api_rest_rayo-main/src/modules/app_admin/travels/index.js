const express = require("express");

const travelRoutes = require("./routes/travels.routes")

const router = express.Router();


router.use("/travels", travelRoutes)




module.exports = router;
