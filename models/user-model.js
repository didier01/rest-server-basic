const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "Nombre es requerido"],
  },
  email: {
    type: String,
    required: [true, "correo es requerido"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "contraseña es requerida"],
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    required: [true, "rol es requerido"],
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};
module.exports = model("User", UserSchema);
