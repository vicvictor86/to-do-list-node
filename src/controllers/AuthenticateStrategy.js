const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const blacklist = require('../redis/BlacklistController');

const User = require("../model/UserTable");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function verifyUser(user){
    if(!user){
        throw new Error("User with this email not found");
    };
};

async function verifyBlacklistToken(token){
    const blacklistToken = await blacklist.hasToken(token);
    if(blacklistToken){
        throw new jwt.JsonWebTokenError("Invalid token by logout!");
    }
}

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

passport.use(
    new BearerStrategy(
        async (token, done) => {
            try{
                await verifyBlacklistToken(token);
                const payload = jwt.verify(token, process.env.CHAVE_JWT);
                const user = await User.getById(payload.id);
                done(null, user, { token : token });
            } catch(error){
                done(error);
            }
        }
    )
)