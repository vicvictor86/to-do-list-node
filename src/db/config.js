const Sequelize = require('sequelize');

const instance = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

module.exports = instance;