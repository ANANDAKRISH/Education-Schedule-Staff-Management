import { ApiError } from "../utilities/ApiError.js"
import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"

// JWT
const verifyJWT = async(req,_,next) => {

    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
    
        if(!token) {
            throw new ApiError(401,"No token found")
        }
    
        const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id)
        
        if(!user) {
            throw new ApiError(401,"Invalid access token as user doesnt exist")
        }
    
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid access token")
    }
}

// RBAC
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const user = req.user
        if(!user) {
            return next(new ApiError(401, "No token found"))
        }

        if(!allowedRoles.includes(user.role)) {
            return next(new ApiError(403, "Access denied"))
        }

        next()
    }
}

export {
    authorizeRoles,
    verifyJWT
}