const User = require("../model/UserTable");
const jwt = require("jsonwebtoken");
const blacklist = require('../redis/BlacklistController');

const UserValidations = require("../validations/UserValidations");

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

        UserValidations.validateName(newUser, nameExists);
        UserValidations.validateEmail(newUser, emailExists);
        UserValidations.validatePassword(newUser);

        newUser.hash_password = await User.createHashPassword(newUser.password);

        await User.create({
            name: newUser.name,
            email: newUser.email,
            hash_password: newUser.hash_password
        });

        res.redirect("/login");
    },

    screenLogin(req, res) {
        res.render("login");
    },

    screenSignUp(req, res){
        res.render("signup");
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
    
}