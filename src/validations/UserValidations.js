const { InvalidArgumentError } = require("../errors/errors");

module.exports = {
    validateEmail(newUser, emailExists){
        if(emailExists){
            throw new InvalidArgumentError("O email colocado já existe");
        } else if(newUser.email === ""){
            throw new InvalidArgumentError("Email vazios não são aceitas");
        };
    },

    validateName(newUser, nameExists){
        if(nameExists){
            throw new InvalidArgumentError("O nome colocado já existe");
        } else if(newUser.name === ""){
            throw new InvalidArgumentError("Nomes vazios não são aceitas");
        };
    },

    validatePassword(newUser){
        if(newUser.password !== newUser.confirmPassword){
            throw new InvalidArgumentError("As senhas não podem ser diferente");
        } else if(newUser.password === ""){
            throw new InvalidArgumentError("Senhas vazias não são aceitas");
        };
    }
}

