require("dotenv").config();
require('./redis/blacklist');

const express = require("express");
const path = require("path");
const routes = require("./routes");
const server = express();
const cookieParser = require("cookie-parser");

const { AuthenticateStrategy } = require("./controllers/AuthenticateStrategy");
const port = 3000;
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, 'views'));

server.use(cookieParser());
server.use(express.static("public"));
server.use(express.urlencoded({extended: true}));
server.use(routes);

server.listen(port, () => console.log("Server rodando"));