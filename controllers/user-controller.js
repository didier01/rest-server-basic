const { response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user-model");

const getUsers = async (req, res = response) => {
  // const params = req.query;
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };
  // const users = await User.find(query).limit(limit).skip(from);
  // const totalUsers = await User.countDocuments(query);
  const [users, totalUsers] = await Promise.all([
    User.find(query).limit(limit).skip(from),
    User.countDocuments(query),
  ]);

  res.json({
    msg: "get API -  Controller",
    body: users,
    total: totalUsers,
  });
};

const postUsers = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, role });

  // Check if Email exist
  // const emailExist = await User.findOne({ email });
  // if (emailExist) {
  //   return res.status(400).json({
  //     msg: "Este correo ya está en uso",
  //   });
  // }

  // Encrypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Save Document
  await user.save();
  res.json({
    msg: "post API -  Controller",
    user,
  });
};

const putUsers = async (req, res = response) => {
  const id = req.params.id;
  const { _id, password, google, email, ...userUpdate } = req.body;
  // validar base de datos

  if (password) {
    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    userUpdate.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, userUpdate);

  res.json({
    msg: "put API -  Controller",
    user,
  });
};

const deleteUsers = async (req, res = response) => {
  const id = req.params.id;
  // borrar de bd
  // const userDelete = await User.findByIdAndDelete(id);
  const userUpdate = await User.findByIdAndUpdate(id, { status: false });
  res.json({
    msg: "delete API -  Controller",
    userUpdate,
  });
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
};
