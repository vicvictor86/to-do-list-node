const taskTable = require("../model/Task");
const userTable = require("../model/User");

userTable.hasMany(taskTable);
taskTable.belongsTo(userTable);

taskTable
    .sync()
    .then(() => console.log("Tabela de tasks criada com sucesso"))
    .catch(console.log);

userTable
    .sync()
    .then(() => console.log("Tabela de Usuários criada com sucesso"))
    .catch(console.log);