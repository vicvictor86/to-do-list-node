const express = require("express");
const routes = express.Router();
const TaskController = require("./controllers/TaskController");

routes.get('/', TaskController.index);
routes.post('/', TaskController.create);
routes.post('/update/:id', TaskController.update);
routes.post('/delete/task/:id', TaskController.delete);

module.exports = routes;