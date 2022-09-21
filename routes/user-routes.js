const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares/validate-fields");
const {
  validateRole,
  validateEmailExist,
  validateUserExist,
} = require("../helpers/db-validators");

const {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
  patchUsers,
} = require("../controllers/user-controller");

const router = Router();

router.get("/", getUsers);
router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El correo no es válido").isEmail(),
    check("email").custom(validateEmailExist),
    check("password", "La contraseña debe tener más de 6 letras").isLength({
      min: 6,
    }),
    // check("role", "El rol no es válido").isIn(["ADMIN", "USER"]),
    check("role").custom(validateRole),
    validateFields,
  ],
  postUsers
);

router.put(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(validateUserExist),
    check("role").custom(validateRole),
    validateFields,
  ],
  putUsers
);

router.delete(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(validateUserExist),
    validateFields,
  ],
  deleteUsers
);

module.exports = router;
