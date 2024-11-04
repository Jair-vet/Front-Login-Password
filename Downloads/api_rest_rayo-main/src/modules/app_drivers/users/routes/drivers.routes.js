const { Router } = require("express");
const { editIdDevice } = require("../controllers/drivers.controller");
const { validateJWT } = require("../../../../core/middlewares/validate-jwt");
const router = Router();


router.put("/device", [validateJWT], editIdDevice)

module.exports = router;
