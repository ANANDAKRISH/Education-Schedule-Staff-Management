import { User } from "../models/user.model"
import mongoose from "mongoose"
import { ApiError } from "./ApiError"

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