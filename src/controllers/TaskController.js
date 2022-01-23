const Task = require("../model/TaskTable");

module.exports = {
    async index(req, res){
        const tasks = await Task.get();

        const tasksPerType = Task.taskPerType(tasks);
        const listOfTypes = Object.keys(tasksPerType);

        res.render("index", {types : listOfTypes, tasks : tasksPerType});
    },

    async create(req, res){
        const newTask = req.body;
        const status = req.params.status;

        const tasks = await Task.get();
        const taskPerType = Task.taskPerType(tasks);

        const taskPerTypeLength = taskPerType[status].length;
        const lastOrder = taskPerType[status][taskPerTypeLength - 1]?.order_task || 0;

        await Task.create({
            name: newTask.name,
            status: status,
            order_task: lastOrder + 1
        });

        res.redirect("/");
    },

    async update(req, res){
        const newTask = req.body;
        const taskId = req.params.id;
      
        const task = await Task.getById(taskId);
        const needToAlterName = newTask.taskName;
        
        const clickedInTaskDone = !newTask.check && task.status === "done" && !needToAlterName;
        const clickedInTask = newTask?.check === "on" && !needToAlterName;

        if(!needToAlterName){
            newTask.taskName = task.name;
        }

        if(clickedInTask || clickedInTaskDone){
            switch(task.status){
                case "toDo":
                    newTask.status = "doing";
                    break;
                case "doing":
                    newTask.status = "done";
                    break;
                case "done":
                    await Task.delete(taskId);
                    return res.redirect("/");
                default:
                    newTask.status = task.status;
                    break;
            }
        }else{
            newTask.status = task.status;
        }

        await Task.update({
            id: taskId,
            name: newTask.taskName,
            status: newTask.status
        }); 
    
        res.redirect("/");
    },

    async delete(req, res){
        const taskId = req.params.id;
        await Task.delete(taskId);
        res.redirect("/");
    }
}