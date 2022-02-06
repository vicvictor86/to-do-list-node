const Sequelize = require('sequelize');
const instance = require('../db/config');

const columns = {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    order_task: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
};

const options = {
    freezeTableName: true,
    tableName: "task",
    timestamps: true
};

module.exports = instance.define("task", columns, options);