const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")


const validateToken=asyncHandler((req,res,next)=>{
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token= authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.status(400)
                throw new Error("invalid or expired token")
            }
            req.user = decoded.user;
            next();
        })
    }else{
        res.status(400)
        throw new Error("something went wrong at end of decoder")
    }
})

module.exports = validateToken