const { Router } = require("express");
const { validateJWT } = require("../../../../core/middlewares/validate-jwt");
const { getTravels } = require("../controllers/travels.controller");

const router = Router();

router.get("/", [validateJWT], getTravels);


module.exports = router;
