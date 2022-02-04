const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require("../model/UserTable");

const bcrypt = require('bcrypt');

function verifyUser(user){
    if(!user){
        throw new Error("User with this email not found");
    };
};

async function verifyPassword(password, hashPassword){
    const validPassword = await bcrypt.compare(password, hashPassword);
    if(!validPassword){
        throw new Error("Email or password incorrect");
    };
};

passport.use(
    new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        session: false
    }, async(email, password, done) => {
        try{
            const user = await User.getByField("email", email);
            verifyUser(user);
            await verifyPassword(password, user.hash_password);

            done(null, user);
        } catch (error) {
            done(error);
        };
    })
);