import { ApiError } from "../utilities/ApiError";
import { asyncHandler } from "../utilities/asyncHandler";
import { User } from "../models/user.model";
import { ApiResponse } from "../utilities/ApiResponse";
import { generateAccessAndRefreshTokens } from "../utilities/generateTokens";


const userLogin = asyncHandler(async(req, res) => {
    const {userName, email, password} = req.body

    if(!(userName || email)) {
        throw new ApiError(400, "username or email is required to login")
    }

    const user = await User.findOne({
        $or : [
            { userName: userName.toLowerCase() }, 
            { email: email.toLowerCase() }
        ]
    })

    if(!user) {
        throw new ApiError(400, "User doesn't exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password.trim())
    if(!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const {refreshToken, accessToken} = generateAccessAndRefreshTokens(user._id)

    const options = {
        httpOnly : true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user,
                accessToken,
                refreshToken
            },
            "User logged In Successfully"
        )
    )
})

const userLogout = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken : 1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly : true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {user: req.user.userName}, "User logged out successfully"))
})

export {
    userLogin,
    userLogout
}
