const express = require("express");
const routes = express.Router();

const TaskController = require("./controllers/TaskController");
const UserController = require("./controllers/UserController");

const autorizationMiddleware = require("./controllers/AutorizationMiddlewares");

routes.get('/', autorizationMiddleware.bearer, TaskController.index);
routes.post('/task/:status', TaskController.create);
routes.post('/task/update/:id', TaskController.update);
routes.post('/task/delete/:id', TaskController.delete);

routes.post('/user/login', autorizationMiddleware.local, UserController.login);

routes.get('/user', UserController.get);
routes.post('/user', UserController.create);

module.exports = routes;