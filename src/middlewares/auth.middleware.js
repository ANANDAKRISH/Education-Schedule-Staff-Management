


// verifyJWT
// populate req.user
// RBAC

import { ApiError } from "../utilities/ApiError"

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
    authorizeRoles
}