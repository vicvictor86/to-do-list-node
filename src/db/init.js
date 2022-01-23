const taskTable = require("../model/Task");

taskTable
    .sync()
    .then(() => console.log("Tabela de tasks criada com sucesso"))
    .catch(console.log);