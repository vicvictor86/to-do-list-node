const Model = require("./Task");
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

    async create(newTask){
        return await Model.create(newTask);
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

    taskPerType(tasks){
        let toDo = [];
        let doing = [];
        let done = [];

        tasks.forEach(task => {
            switch(task.status.toLowerCase()){
                case "todo":
                    toDo.push(task);
                    break;
                case "doing":
                    doing.push(task);
                    break;
                case "done":
                    done.push(task);
                    break;
                default:
                    console.log("Status inválido");
            }
        })
    
        const listPerType = {toDo, doing, done};
        return listPerType;
    },
}