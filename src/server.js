const express = require("express");
const path = require("path");
const routes = require("./routes");
const server = express();

const port = 3000;
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, 'views'));

server.use(express.static("public"));
server.use(routes);

server.listen(port, () => console.log("Server rodando"));