const { Router } = require("express");
const { getClients } = require("../controllers/clients.controller");
const { validateJWT } = require("../../../../core/middlewares/validate-jwt");


const router = Router();

router.get("/", [validateJWT], getClients);

module.exports = router;
