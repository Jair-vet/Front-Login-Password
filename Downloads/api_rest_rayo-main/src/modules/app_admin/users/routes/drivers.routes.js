const { Router } = require("express");
const { addDrivers, getDrivers } = require("../controllers/drivers.controller");
const { validateJWT } = require("../../../../core/middlewares/validate-jwt");

const router = Router();

router.post("/", [validateJWT], addDrivers);
router.get("/", [validateJWT], getDrivers)
module.exports = router;
