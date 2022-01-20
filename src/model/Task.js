const Database = require("../db/config");
const ToDo = Symbol("ToDo");
const Doing = Symbol("Doing");
const Done = Symbol("Done");

module.exports = {
    async get(){
        const db = await Database();
        
        const tasks = await db.all(`SELECT * FROM task`);
        
        await db.close();
        return tasks;
    },

    async getById(id){
        const db = await Database();
        
        const tasks = await db.get(`SELECT * FROM task WHERE id = ${id}`);
        
        await db.close();
        return tasks;
    },

    async create(newTask){
        const db = await Database();
        
        await db.run(`
            INSERT INTO task (
                name, 
                status, 
                order_task
            ) VALUES (
                "${newTask.name}",
                "${newTask.status}",
                ${newTask.order}
            );
        )`);

        await db.close();
    },

    async update(taskUpdated){
        const db = await Database();
        const task = await db.get(`SELECT * FROM task WHERE id = ${taskUpdated.id}`);        

        if(!taskUpdated.name){
            taskUpdated.name = task.name;
        }

        await db.run(`UPDATE task SET 
            name = "${taskUpdated.name}",
            status = "${taskUpdated.status}"
            WHERE id = "${taskUpdated.id}"
        `);

        await db.close();
    },

    async delete(taskId){
        const db = await Database();
        
        await db.run(`DELETE FROM task WHERE id = ${taskId}`);

        await db.close();
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