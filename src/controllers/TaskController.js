const Task = require("../model/Task");

module.exports = {
    async index(req, res){
        const tasks = await Task.get();
        res.render("index", {tasks})
    },

    async create(req, res){
        const newTask = req.body;
        const tasks = await Task.get();
        const lastOrder = tasks[tasks.length - 1]?.order || 1;

        await Task.create({
            name: newTask.name,
            status: "ToDo",
            order: lastOrder + 1
        });
        res.redirect("/");
    },

    async update(req, res){
        const newTask = req.body;
        const taskId = req.params.id;
        
        newTask.status = newTask?.check === "on" ? "Done" : "ToDo";
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