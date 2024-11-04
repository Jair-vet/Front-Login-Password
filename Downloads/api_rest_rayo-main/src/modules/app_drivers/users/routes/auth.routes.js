const { Router } = require("express");
const { validateJWT } = require("../../../../core/middlewares/validate-jwt.js");
const { login, renewToken } = require("../controllers/auth.controller.js");
const router = Router();

router.post("/login", login);
router.get("/renew", [validateJWT], renewToken);

module.exports = router;