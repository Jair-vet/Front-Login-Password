const { Router } = require("express");
const { validateJWT } = require("../../../../core/middlewares/validate-jwt");
const { acceptedTravel, getTravelToDriver, notifyArrivalToClient, startTravel, endTravel } = require("../controllers/travels.controller");

const router = Router();

router.put("/accepted/:id", [validateJWT], acceptedTravel);
router.put("/start/:id", [validateJWT], startTravel);
router.put("/end/:id", [validateJWT], endTravel);
router.get("/:id", [validateJWT], getTravelToDriver);
router.post("/notify/:id", [validateJWT], notifyArrivalToClient)
module.exports = router;
