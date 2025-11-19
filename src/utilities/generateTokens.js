import { User } from "../models/user.model.js"
import { ApiError } from "./ApiError.js"

const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await User.findById(userId)
        const refreshToken = user.generateRefreshToken()
        const accessToken = user.generateAccessToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave : false})

        return {refreshToken, accessToken}
    } catch (error) {
        throw new ApiError(500, "Failed to generate the tokens")
    }
}

export {generateAccessAndRefreshTokens}