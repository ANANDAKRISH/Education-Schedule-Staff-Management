// Shared Operations (make use of req.user.role to validate)

import { isValidObjectId } from "mongoose"
import { ApiError } from "../utilities/ApiError"
import { ApiResponse } from "../utilities/ApiResponse"
import { asyncHandler } from "../utilities/asyncHandler"
import { Schedule } from "../models/schedule.model"

const getStudentById = asyncHandler(async(req, res) => {

    const currentUser = req.user
    const {studentId} = req.params

    if(!isValidObjectId(studentId)) {
        throw new ApiError(400, "Inavlid Student Id")
    }

    if(currentUser.role == 'student' && currentUser._id.toString() !== studentId) {
        throw new ApiError(403, "Forbidden - No permission to access user details")
    }
    
    const student = await User.findById(studentId)
    if(!student) {
        throw new ApiError(404, "Student not found")
    }

    return res
            .status(200)
            .json(
            new ApiResponse(
                200,
                student,
                "Fetched student data successfully"
            )
            )
})

const getStaffById = asyncHandler(async(req, res) => {
    const currentUser = req.user
    
    const {staffId} = req.params

    if(!isValidObjectId(staffId)) {
        throw new ApiError(400, "Inavlid Staff Id")
    }

    if(currentUser.role == 'staff' && currentUser._id.toString() !== staffId) {
        throw new ApiError(403, "Forbidden - No permission to access user details")
    }
    
    const staff = await User.findById(staffId)
    if(!staff) {
        throw new ApiError(404, "Staff not found")
    }

    return res
            .status(200)
            .json(
            new ApiResponse(
                200,
                student,
                "Fetched student data successfully"
            )
            )
})

const updateStudentById = asyncHandler(async(req, res) => {
    const currentUser = req.user
    const {studentId} = req.params
    const {fullName, email} = req.body


    if(!isValidObjectId(studentId)) {
        throw new ApiError(400, "Inavlid Student Id")
    }

    if(currentUser.role == 'student' && currentUser._id.toString() !== studentId) {
        throw new ApiError(403, "Forbidden - No permission to access user details")
    }
    
    const existingStudent = await User.findById(studentId)
    if(!existingStudent) {
        throw new ApiError(404, "Student not found")
    }
    
    let isModified = false
    if(email) {
        const trimmedEmail = email.trim()
        if(trimmedEmail && existingStudent.email !== trimmedEmail) {
            // basic email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if(!emailRegex.test(trimmedEmail)) {
                return res
                       .status(400)
                       .json(
                        new ApiResponse(
                            400,
                            new ApiResponse(
                                400,
                                [],
                                "Wrong email format"
                            )
                        )
                       )
            }

            const emailExists = await User.findOne({
                email: trimmedEmail,
                _id: {$ne: existingStudent._id}
            })

            if(emailExists) {
                return res
                       .status(400)
                       .json(
                        new ApiResponse(
                            400,
                            [],
                            "Email already exists"
                        )
                       )
            }

            existingStudent.email = trimmedEmail
            isModified = true
        }
    }

    if(fullName) {
        const trimmedFullName = fullName.trim()
        if(trimmedFullName && existingStudent.fullName !== trimmedFullName) {
            if(trimmedFullName.length < 2) {
                return res
                       .status(400)
                       .json(
                        new ApiResponse(
                            400,
                            [],
                            "Name must be atleast 2 characters long"
                        )
                       )
            }
        }

        existingStudent.fullName = trimmedFullName
        isModified = true
    }

    if(isModified) {
        const saveResult = await existingStudent.save()
        return res
               .status(200)
               .json(
                new ApiResponse(
                    200,
                    existingStudent,
                    "Profile updated successfully"
                )
               )
    }

    return res
           .status(200)
           .json(
            new ApiResponse(
                200,
                existingStudent,
                "No changes were made"
            )
           )


})

const updateStaffById = asyncHandler(async(req, res) => {
    const currentUser = req.user
    const {staffId} = req.params
    const {fullName, email} = req.body


    if(!isValidObjectId(staffId)) {
        throw new ApiError(400, "Inavlid Staff Id")
    }

    if(currentUser.role == 'staff' && currentUser._id.toString() !== staffId) {
        throw new ApiError(403, "Forbidden - No permission to access user details")
    }
    
    const existingStaff = await User.findById(staffId)
    if(!existingStaff) {
        throw new ApiError(404, "Staff not found")
    }
    
    let isModified = false
    if(email) {
        const trimmedEmail = email.trim()
        if(trimmedEmail && existingStaff.email !== trimmedEmail) {
            // basic email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if(!emailRegex.test(trimmedEmail)) {
                return res
                       .status(400)
                       .json(
                        new ApiResponse(
                            400,
                            new ApiResponse(
                                400,
                                [],
                                "Wrong email format"
                            )
                        )
                       )
            }

            const emailExists = await User.findOne({
                email: trimmedEmail,
                _id: {$ne: existingStaff._id}
            })

            if(emailExists) {
                return res
                       .status(400)
                       .json(
                        new ApiResponse(
                            400,
                            [],
                            "Email already exists"
                        )
                       )
            }

            existingStaff.email = trimmedEmail
            isModified = true
        }
    }

    if(fullName) {
        const trimmedFullName = fullName.trim()
        if(trimmedFullName && existingStaff.fullName !== trimmedFullName) {
            if(trimmedFullName.length < 2) {
                return res
                       .status(400)
                       .json(
                        new ApiResponse(
                            400,
                            [],
                            "Name must be atleast 2 characters long"
                        )
                       )
            }
        }

        existingStaff.fullName = trimmedFullName
        isModified = true
    }

    if(isModified) {
        const saveResult = await existingStaff.save()
        return res
               .status(200)
               .json(
                new ApiResponse(
                    200,
                    existingStaff,
                    "Profile updated successfully"
                )
               )
    }

    return res
           .status(200)
           .json(
            new ApiResponse(
                200,
                existingStaff,
                "No changes were made"
            )
           )
    
})

const getSchedules = asyncHandler(async(req, res) => {

})

const getScheduleById = asyncHandler(async(req, res) => {
    const currentUser = req.user
    const {scheduleId} = req.params

    if(!isValidObjectId(scheduleId)) {
        throw new ApiError(400, "Invalid Schedule ID")
    }
    
    const currentSchedule = await Schedule.findById(scheduleId)
    if(!currentSchedule) {
        throw new ApiError(400, "Schedule not found")
    }

    if(currentUser.role === 'student') {
        if(!currentSchedule.attendees.some(id => id.toString() === currentUser._id.toString())) {
            throw new ApiError(400, "Not authroized to view")
        }
    }

    if(currentUser.role === 'staff' && currentUser._id.toString() !== currentSchedule.createdBy.toString()) {
        throw new ApiError(400, "Not authorized to view")
    }

    return res
           .status(200)
           .json(
            new ApiResponse(
                200,
                currentSchedule,
                "Schedule fetched successfully"
            )
           )

})

const updateScheduleById = asyncHandler(async(req, res) => {
    const currentUser = req.user
    const {scheduleId} = req.params
    const {yearNo, semesterNo, batch, startAt, endAt} = req.body

    if(!isValidObjectId(scheduleId)) {
        throw new ApiError(400, "Invalid schedule ID")
    }

    const currentSchedule = await Schedule.findById(scheduleId)
    if(!currentSchedule) {
        throw new ApiError(400, "Schedule not found")
    }

    if(currentUser.role == 'staff' && currentSchedule.createdBy.toString() !== currentUser._id) {
        throw new ApiError(403, "User Not authorized to update")
    }

    let isModified = false

    if(yearNo && yearNo.toString().length == 4 && currentSchedule.yearNo !== yearNo) {
        currentSchedule.yearNo = yearNo
        isModified = true
    }

     if(semesterNo && semesterNo.toString().length == 1 && currentSchedule.semesterNo !== semesterNo) {
        currentSchedule.semesterNo = semesterNo
        isModified = true
    }

     if(batch) {
        trimmedBatch = batch.trim()
        if(trimmedBatch && currentSchedule.batch !== trimmedBatch) {
            currentSchedule.batch = trimmedBatch
            isModified = true
        }
    }

    if(startAt && endAt) {

        const startDate = new Date(startAt)
        const endDate = new Date(endAt)

        if(isNaN(startDate) || isNaN(endDate)) {
            throw new ApiError(400, "Inavalid date format")
        }

        if(endDate < startAt) {
            throw new ApiError(400, "End date cannot be earlier than start date")
        }

        currentSchedule.startAt = startDate
        currentSchedule.endAt = endDate
        isModified = true
    }

    if(isModified) {
        const saveResult = await currentSchedule.save()
        return res
               .status(200)
               .json(
                new ApiResponse(
                    200,
                    currentSchedule,
                    "Schedule updated successfully"
                )
               )
    }

    return res
           .status(200)
           .json(
            new ApiResponse(
                200,
                currentSchedule,
                "No changes were made"
            )
           )
           
})

const deleteScheduleById = asyncHandler(async(req, res) => {
    const currentUser = req.user
    const {scheduleId} = req.params

    if(!isValidObjectId(scheduleId)) {
        throw new ApiError(400, "Invalid schedule ID")
    }

    const currentSchedule = await Schedule.findById(scheduleId)
    if(!currentSchedule) {
        throw new ApiError(400, "Schedule not found")
    }

    if(currentUser.role == 'staff' && currentSchedule.createdBy.toString() !== currentUser._id) {
        throw new ApiError(403, "User Not authorized to delte")
    }

    const result = await Schedule.findByIdAndDelete(scheduleId)
    if(!result) {
        throw new ApiError(404, "Failed to delete the document")
    }

    return res
           .status(200)
           .json(
            new ApiResponse(
                200,
                {
                    deletedSchedule: currentSchedule
                },
                "Schedule document deleted successfully"
            )
           )
})


export {
    getStudentById,
    getStaffById,
    updateStudentById,
    updateStaffById,
    getSchedules,
    getScheduleById,
    updateScheduleById,
    deleteScheduleById
}