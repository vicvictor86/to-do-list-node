addEventListener("keydown", (event) => {
    if(event.key === "Enter" && editingTask){    
        editingTask = false;
    }
})

let editingTask = false;
function editTask(taskid){
    let inputTaskName = document.getElementById("taskName"+taskid);
    inputTaskName.removeAttribute("disabled");
    inputTaskName.removeAttribute("class");

    let button = document.getElementById("button"+taskid);
    button.setAttribute("hidden", "");

    inputTaskName.addEventListener("focus", event => {
        editingTask = true;
    })
    inputTaskName.addEventListener("focusout", event => {
        editingTask = false;
    })
}

function updateTask(taskId){
    const form = document.getElementById("update-task" + taskId);
    form.submit();
}
