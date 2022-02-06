const Task = require("../model/TaskTable");
const jwt = require("jsonwebtoken");

function getUserId(req, res){
    const token = (req.cookies.token).split(" ")[1];
    const payload = jwt.verify(token, process.env.CHAVE_JWT);
    return payload.id;
}

module.exports = {
    async index(req, res){
        const tasks = await Task.getUsersTasks(getUserId(req, res));
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

        try{
            const userId = getUserId(req, res);
            await Task.create({
                name: newTask.name,
                status: status,
                order_task: lastOrder + 1, 
                userId: userId
            });
    
            res.redirect("/");
        }catch(error){
            if(error.name === "TokenExpiredError"){
                return res.redirect("/login");
            }else{
                console.log(error);
            }
        }
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