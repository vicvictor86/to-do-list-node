const Sequelize = require('sequelize');
const instance = require('../db/config');

const columns = {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false
    },

    hash_password: {
        type: Sequelize.STRING,
        allowNull: false
    }
};

const options = {
    freezeTableName: true,
    tableName: "user",
    timestamps: true
};

module.exports = instance.define("user", columns, options);