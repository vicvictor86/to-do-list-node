const User = require("../model/UserTable");
const jwt = require("jsonwebtoken");
const blacklist = require('../redis/BlacklistController');
const bent = require("bent");

function createToken(user) {
    const payload = {
        id: user.id
    };

    const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: "30m" });
    return token;
}

module.exports = {
    async get(req, res){
        const user = await User.get();

        res.send(user);
    },

    async create(req, res){
        const newUser = req.body;
    
        const nameExists = await User.getByField("name", newUser.name);
        const emailExists = await User.getByField("email", newUser.email);

        if(nameExists){
            throw new Error("O nome colocado já existe");
        } else if(emailExists){
            throw new Error("O email colocado já existe");
        } else if(newUser.password === ""){
            throw new Error("Senhas vazias não são aceitas");
        } else if(newUser.name === ""){
            throw new Error("Nomes vazios não são aceitas");
        } else if(newUser.email === ""){
            throw new Error("Email vazios não são aceitas");
        }

        newUser.hash_password = await User.createHashPassword(newUser.password);

        await User.create({
            name: newUser.name,
            email: newUser.email,
            hash_password: newUser.hash_password
        });

        res.redirect("/");
    },

    screenLogin(req, res) {
        res.render("login");
    },

    login(req, res){
        const token = createToken(req.user);
        const bearerToken = "Bearer " + token;
        console.log(bearerToken);
        res.cookie("token", bearerToken, {MaxAge: 900000, httpOnly: true});

        res.redirect("/");
    },

    async logout(req, res){
        try{
            const token = req.token;
            await blacklist.insert(token);
            res.redirect("/login");
        }catch(erro){
            res.status(500).json({erro: erro.message});
        }
    }
    
    // async update(req, res){
    //     const newTask = req.body;
    //     const taskId = req.params.id;
      
    //     const task = await Task.getById(taskId);
    //     const needToAlterName = newTask.taskName;
        
    //     const clickedInTaskDone = !newTask.check && task.status === "done" && !needToAlterName;
    //     const clickedInTask = newTask?.check === "on" && !needToAlterName;

    //     if(!needToAlterName){
    //         newTask.taskName = task.name;
    //     }

    //     if(clickedInTask || clickedInTaskDone){
    //         switch(task.status){
    //             case "toDo":
    //                 newTask.status = "doing";
    //                 break;
    //             case "doing":
    //                 newTask.status = "done";
    //                 break;
    //             case "done":
    //                 await Task.delete(taskId);
    //                 return res.redirect("/");
    //             default:
    //                 newTask.status = task.status;
    //                 break;
    //         }
    //     }else{
    //         newTask.status = task.status;
    //     }

    //     await Task.update({
    //         id: taskId,
    //         name: newTask.taskName,
    //         status: newTask.status
    //     }); 
    
    //     res.redirect("/");
    // },

    // async delete(req, res){
    //     const taskId = req.params.id;
    //     await Task.delete(taskId);
    //     res.redirect("/");
    // }


}