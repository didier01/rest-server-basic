const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares/validate-fields");
const { login } = require("../controllers/login-controller");


const router = Router();

router.post(
  "/login",
  [
    check("email", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El correo no es válido").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validateFields
  ],
  login
);

module.exports = router;
