const ToDo = Symbol("ToDo");
const Doing = Symbol("Doing");
const Done = Symbol("Done");

let tasks = [
    {
        id: 0,
        name: "Levantar",
        status: "Done",
        order: 0
    },
    {
        id: 1,
        name: "Lavar o rosto",
        status: "Doing",
        order: 1
    },
    {
        id: 2,
        name: "Ligar o computador",
        status: "ToDo",
        order: 2
    },
];

module.exports = {
    get(){
        return tasks;
    },
    create(newTask){
        tasks.push(newTask);
    },
    update(taskUpdated){
        tasks = tasks.map((task)=> {
            if(Number(task.id) === Number(taskUpdated.id)){
                task = {
                    ...task,
                    name: taskUpdated.name,
                    status: taskUpdated.status
                }   
            }

            return task;
        });
    },
    delete(taskId){
        tasks = tasks.filter((task)=>{
            if(Number(task.id) !== Number(taskId)){
                return task;
            }
        })
    }
}