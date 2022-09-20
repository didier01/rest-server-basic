const express = require("express");
const cors = require("cors");
require("dotenv").config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userRoutesPath = "/api/users/";
    // Middleware
    this.middleware();
    // Routes
    this.routes();
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
    this.app.use(this.userRoutesPath, require("../routes/user-routes"));    
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("listening at port: " + this.port);
    });
  }
}

module.exports = Server;
