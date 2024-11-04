const { Router } = require("express");
const { validateJWT } = require("../../../../core/middlewares/validate-jwt");
const { addTravel, cancelTravel, getTravelToClient } = require("../controllers/travels.controller");

const router = Router();

router.post("/", [validateJWT], addTravel);
router.get("/:id", [validateJWT], getTravelToClient);
router.put("/cancel/:id", [validateJWT], cancelTravel);


module.exports = router;
