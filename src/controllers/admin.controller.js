import { ApiError } from "../utilities/ApiError";
import { asyncHandler } from "../utilities/asyncHandler";
import { User } from "../models/user.model";
import { ApiResponse } from "../utilities/ApiResponse";
import { generateAccessAndRefreshTokens } from "../utilities/generateTokens";
import { isValidObjectId } from "mongoose";


const  registerUser = asyncHandler(async(req, res) => {
    const currentUser = req.user
    if(!currentUser) {
        throw new ApiError(401, "No token found")
    }

    if(currentUser.role !== 'admin') {
        throw new ApiError(403, "Forbidden - No permission to register new user")
    }

    const {userName, email, fullName, password, role} = req.body

    if([userName, email, fullName, password, role].some((field) => field?.trim === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const existingUser = await User.findOne({
        $or: [
            {userName: userName.toLowerCase()}, 
            {email: email.toLowerCase()}
        ]
    })

    if(existingUser) {
        throw new ApiError(400, "User with provided email or username already exists")
    }

    const user = await User.create({
        userName,
        fullName,
        email,
        password,
        role
    })

    const createdUser  = await User.findById(user._id)
    if(!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(200).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )
})


const getAllStudents = asyncHandler(async(req, res) => {
    const students = await User.find({role : "student"})
    if(students.length === 0) {
        return res
               .status(200)
               .json(
                new ApiResponse (
                    200,
                    [],
                    "No students added yet"
                )
               )
    }

    return res
           .status(200)
           .json(
            new ApiResponse(
                200,
                students,
                "List of all Student data fetched successfully"
            )
           )
})

const getAllStaffs = asyncHandler(async(req, res) => {

    const staffs = await User.find({role : "staff"})
    if(staffs.length === 0) {
        return res
               .status(200)
               .json(
                new ApiResponse (
                    200,
                    [],
                    "No staffs added yet"
                )
               )
    }

    return res
           .status(200)
           .json(
            new ApiResponse(
                200,
                staffs,
                "List of all Student data fetched successfully"
            )
           )
})

const deleteStaffById = asyncHandler(async(req, res) => {
    const {staffId} = req.params

    if(!isValidObjectId(staffId)) {
        throw new ApiError(400, "Inavlid Staff Id")
    }

    const staff = await User.findById(staffId)
    if(!staff) {
        throw new ApiError(404, "Staff not found")
    }

    const result = await User.deleteOne({role: 'staff', _id: staffId})
    if(result.deletedCount === 0) {
        throw new ApiError(404, "No staff found to delete")
    }
    
    return res
           .status(200)
           .json(
            new ApiResponse(
                200,
                {
                    deletedUser : staff
                },
                "User deleted successfully"
            )
           )

})

const deleteStudentfById = asyncHandler(async(req, res) => {
    const {studentId} = req.params

    if(!isValidObjectId(studentId)) {
        throw new ApiError(400, "Inavlid Staff Id")
    }

    const student = await User.findById(staffId)
    if(!student) {
        throw new ApiError(404, "Staff not found")
    }

    const result = await User.deleteOne({role: 'student', _id: studentId})
    if(result.deletedCount === 0) {
        throw new ApiError(404, "No staff found to delete")
    }
    
    return res
           .status(200)
           .json(
            new ApiResponse(
                200,
                {
                    deletedUser : student
                },
                "User deleted successfully"
            )
           )
    
})

export {
    registerUser,
    getAllStaffs,
    getAllStudents,
    deleteStudentfById,
    deleteStaffById
}

