const { Router } = require("express");
const fileUpload = require("express-fileupload");
const { addClient, editClient, editIdDevice } = require("../controllers/clients.controller");
const { validateJWT } = require("../../../../core/middlewares/validate-jwt");
const router = Router();
router.use(fileUpload());
router.post("/", addClient);
router.put("/", [validateJWT], editClient);
router.put("/device", [validateJWT], editIdDevice)

module.exports = router;
