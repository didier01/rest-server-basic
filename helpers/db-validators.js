const Role = require("../models/role-model");
const User = require("../models/user-model");

const validateRole = async (role = "") => {
  const existRol = await Role.findOne({ role });
  if (!existRol) {
    throw new Error(`EL rol ${role} no está registrado en base de datos`);
  }
};

const validateEmailExist = async (email = "") => {
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    throw new Error(`El correo: ${email} ya está en uso`);
  }
};

const validateUserExist = async (_id) => {
  const userExist = await User.findById({ _id });
  if (!userExist) {
    throw new Error(`El usuario con el ID: ${_id} no existe`);
  }
};

module.exports = {
  validateRole,
  validateEmailExist,
  validateUserExist 
};
