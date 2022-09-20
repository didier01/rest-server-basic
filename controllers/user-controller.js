const { response } = require("express");

const getUsers = (req, res = response) => {
  const params = req.query;
  res.json({
    msg: "get API -  Controller",
    body: params,
  });
};

const postUsers = (req, res = response) => {
  const body = req.body;
  res.json({
    msg: "post API -  Controller",
    body: body,
  });
};

const putUsers = (req, res = response) => {
  const id = req.params.id;
  res.json({
    msg: "put API -  Controller",
    body: id,
  });
};

const deleteUsers = (req, res = response) => {
  res.json({
    msg: "delete API -  Controller",
  });
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
};
