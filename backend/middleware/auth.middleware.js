const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

const protectRoute = async (req, res, next) => {
    try {
        
        const accessToken = req.cookies.accessToken;
        if(!accessToken){
            return res.status(401).json({message:"Unauthorized - no token provided"});
        }
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decoded.userid).select("-password");
    
            if(!user){
                return res.status(401).json({message:"Unauthorized - user not found"});
            }   
    
            req.user = user;
            next();
        } catch (error) {
            if(error.name === "TokenExpiredError") {
                return res.status(401).json({message:"Unauthorized - access token expired"});
            }
            throw error;
            
        }
    } catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        return res.status(500).json({message: "Unauthorized - Invalid access token", error: error.message});
        
    }
}

const adminRoute = async (req, res, next) => {
    if(req.user && req.user.role === "admin") {
        next();
    }else{
        return res.status(401).json({message:"Access denied - admin only"});
    }
}

module.exports = { protectRoute, adminRoute };