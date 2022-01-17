const Task = require("../model/Task");

module.exports = {
    index(req, res){
        const tasks = Task.get();
        res.render("index", {tasks})
    },
    create(req, res){
        const newTask = req.body;
        const tasks = Task.get();
        
        const lastOrder = tasks[tasks.length - 1]?.order || 1;
        const lastId = tasks[tasks.length - 1]?.id || 1;
        Task.create({
            id: lastId + 1,
            name: newTask.name,
            status: "ToDo",
            order: lastOrder + 1
        });
        res.redirect("/");
    },

    update(req, res){
        const newTask = req.body;
        const taskId = req.params.id;
        
        newTask.status = newTask?.check === "on" ? "Done" : "ToDo";
        Task.update({
            id: taskId,
            name: newTask.taskName,
            status: newTask.status
        }); 
    
        res.redirect("/");
    },

    delete(req, res){
        const taskId = req.params.id;
        Task.delete(taskId);
        res.redirect("/");
    }
}