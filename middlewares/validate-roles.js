const { response } = require("express");
const User = require("../models/user-model");

const validateAdminRole = async (req, res = response, next) => {
  if (!req.userLogged) {
    return res.status(500).json({
      msg: "Se intenta validar el rol sin el token",
    });
  }
  const { role, name } = req.userLogged;
  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `El usuario: ${name} no es Administrador y no tiene permiso de hacer esto`,
    });
  }
};

const validateAnyRole = (...roles) => {
  return (req, res = response, next) => {
    console.log("roles", roles);
    if (!req.userLogged) {
      return res.status(500).json({
        msg: "Se intenta validar el rol sin el token",
      });
    }

    if (!roles.includes(req.userLogged.role)) {
      return res.status(401).json({
        msg: `EL servicio requiere el tener alguno de estos roles: ${roles}`,
      });
    }

    next();
  };
};
module.exports = {
  validateAdminRole,
  validateAnyRole,
};
