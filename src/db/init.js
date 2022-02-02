const taskTable = require("../model/Task");
const userTable = require("../model/User");

taskTable
    .sync()
    .then(() => console.log("Tabela de tasks criada com sucesso"))
    .catch(console.log);

userTable
    .sync()
    .then(() => console.log("Tabela de Usuários criada com sucesso"))
    .catch(console.log);