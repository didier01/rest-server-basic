const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../database/config");
require("dotenv").config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userRoutesPath = "/api/users";
    this.authPath = "/api/auth";
    // DATABASE
    this.connectDB();
    // Middleware
    this.middleware();
    // Routes
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middleware() {
    // CORS
    this.app.use(cors());

    // Read/Parse Body
    this.app.use(express.json());

    // Public directory
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.authPath, require("../routes/auth-routes"));
    this.app.use(this.userRoutesPath, require("../routes/user-routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("listening at port: " + this.port);
    });
  }
}

module.exports = Server;
