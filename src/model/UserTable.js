const Model = require("./User");
const sequelize = require("sequelize");
const bcrypt = require("bcrypt");

const ToDo = Symbol("ToDo");
const Doing = Symbol("Doing");
const Done = Symbol("Done");

module.exports = {
    async get(){
        return await Model.findAll({ raw : true });
    },

    async getById(id){
        const result = await Model.findOne({
            where : {
                id : id
            }
        });

        if(!result){
            throw new Error("Not found");
        }

        return result;
    },

    async getByField(fieldName, fieldValue){
        const field = {};
        field[fieldName] = fieldValue;

        const result = await Model.findOne({
            where : field
        });

        if(!result){
            throw new NotFound("Income");
        }

        return result;
    },

    async create(newUser){
        return await Model.create(newUser);
    },

    async update(taskUpdated){
        const task = await this.getById(taskUpdated.id);   

        if(!taskUpdated.name){
            taskUpdated.name = task.name;
        }

        return await Model.update(
            taskUpdated,
            {
                where : { id : taskUpdated.id }
            }
        );
    },

    async delete(taskId){
        return await Model.destroy({
            where : { id : taskId }
        });
    },

    createHashPassword(password){
        const hashCost= 12;
        return bcrypt.hash(password, hashCost);
    }
}