const express = require("express");
const routes = express.Router();

const TaskController = require("./controllers/TaskController");
const UserController = require("./controllers/UserController");

const authorizationMiddlewares = require("./controllers/AuthorizationMiddlewares");

routes.get('/', authorizationMiddlewares.bearer, TaskController.index);
routes.post('/task/create/:status', TaskController.create);
routes.post('/task/update/:id', TaskController.update);
routes.post('/task/delete/:id', TaskController.delete);

routes.get("/login", UserController.screenLogin);
routes.get('/signup', UserController.screenSignUp);
routes.post('/user/login', authorizationMiddlewares.local, UserController.login);
routes.get('/user/logout', authorizationMiddlewares.bearer, UserController.logout);

routes.get('/user', UserController.get);
routes.post('/user/create', UserController.create);

module.exports = routes;