const passport = require('passport');

function checkToken(req, res){
    const token = req.cookies.token;
    if(token !== undefined) {
        req.headers["authorization"] = token;
    }else{
        res.sendStatus(403);
    }
}

module.exports = {
    local: (req, res, next) =>{
        passport.authenticate("local", { session: false },
        (error, user, info) =>{
            if(error){
                return res.status(500).json({ error: error.message });
            }

            if(!user){
                return res.status(401).json();
            }

            req.user = user;
            return next();
        })(req, res, next);
    },

    bearer: (req, res, next) => {
        checkToken(req, res);
        passport.authenticate(
            'bearer',
            { session : false },
            (error, user, info) => {
                if(error && error.name === "JsonWebTokenError"){
                    return res.status(401).json({ error: error.message }); 
                }

                if(error && error.name === "TokenExpiredError"){
                    return res.status(401).json({ error: error.message, expiredAt: error.expiredAt });
                }

                if(error){
                    return res.status(500).json({ error: error.message });
                }

                if(!user){
                    return res.status(401).json();
                }
                
                req.token = info.token;
                req.user = user;
                return next();
            }
        ) (req, res, next)
    }, function(req,res,next){
        return res.send({"status": error.message});
    },
}