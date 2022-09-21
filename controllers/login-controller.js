const { response } = require("express");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generate-jwt");

const User = require("../models/user-model");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    // Verify email exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "Usuario y/o contraseña incorectas",
      });
    }

    // User is  active?
    if (!user.status) {
      return res.status(400).json({
        msg: "Este usuario no existe",
      });
    }

    // Verify password
    const validatePassword = bcryptjs.compareSync(password, user.password);
    if (!validatePassword) {
      return res.status(400).json({
        msg: "Usuario y/o contraseña incorectas",
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({ msg: "Login OK", user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Algo salió mal",
    });
  }
};

module.exports = {
  login,
};
