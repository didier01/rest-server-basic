const { response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const validateJWT = async (req, res = response, next) => {
  const token = req.header("x-token");
  //   Valid si existe el token
  if (!token) {
    return res.status(401).json({
      msg: "No tienes token",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);

    const userLogged = await User.findById(uid);
    // Valida si existe el usuario
    if (!userLogged) {
      return res.status(401).json({
        msg: "Token no válido - usuario no existe",
      });
    }
    // Valdia el estado del usuario
    if (!userLogged.status) {
      return res.status(401).json({
        msg: "Token no válido - usuario eliminado",
      });
    }
    req.userLogged = userLogged;

    next();
  } catch (error) {
    return res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validateJWT,
};
