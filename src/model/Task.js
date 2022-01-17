const Database = require("../db/config");

module.exports = {
    async get(){
        const db = await Database();
        
        const tasks = await db.all(`SELECT * FROM task`);

        await db.close();
        
        return tasks.map(task => ({
          id: task.id,
          name: task.name,
          status: task.status,
          order: task.order_task  
        }));
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
    }
}