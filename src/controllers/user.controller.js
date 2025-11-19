// Shared Operations (make use of req.user.role to validate)

import { isValidObjectId } from "mongoose"
import { ApiError } from "../utilities/ApiError.js"
import { ApiResponse } from "../utilities/ApiResponse.js"
import { asyncHandler } from "../utilities/asyncHandler.js"
import { Schedule } from "../models/schedule.model.js"
import { User } from "../models/user.model.js"

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
    const {fullName, email, age, address} = req.body


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
            existingStudent.fullName = trimmedFullName
            isModified = true
        }
    }

    if(age) {
        if(isNaN(age)) {
            return res
                   .status(400)
                   .json(
                    new ApiResponse(
                        400,
                        [],
                        "Age must be a valid number"
                    )
                   )
        }

        existingStudent.age = age
        isModified = true
    }

    if(address) {
        trimmedAddress = address.trim()
        if(trimmedAddress && trimmedAddress !== existingStudent.address) {
            existingStudent.address = address
            isModified = true
        }
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
    const {fullName, email, age, address} = req.body


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
            existingStaff.fullName = trimmedFullName
            isModified = true
        }
    }

    if(age) {
        if(isNaN(age)) {
            return res
                   .status(400)
                   .json(
                    new ApiResponse(
                        400,
                        [],
                        "Age must be a valid number"
                    )
                   )
        }

        existingStudent.age = age
        isModified = true
    }

    if(address) {
        trimmedAddress = address.trim()
        if(trimmedAddress && trimmedAddress !== existingStudent.address) {
            existingStudent.address = address
            isModified = true
        }
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
    const currentUser = req.user
    const {s, yearNo, semesterNo, batch, from, to, page = 1, limit = 20} = req.query

    // Base object for fltering
    let filters = {}

    if(currentUser.role === 'staff') {
        filters.createdBy = currentUser._id
    }else if(currentUser.role === 'student') {
        filters.attendees = currentUser._id
    }

    if(s) {
        filters.$or = [
            {title : {$regex : s, $options: 'i'}}
        ]
    }

    if(yearNo) {
        filters.yearNo = parseInt(yearNo)
    }

    if(semesterNo) {
        filters.semesterNo = parseInt(yearNo)
    }

    if(batch && batch.trim()) {
        filters.batch = batch.trim().toUpperCase()
    }

    if(from || to) {
        filters.startAt = {}

        if(from) {
            filters.startAt.$gte = new Date(from)
        }
        
        if(to) {
            filters.startAt.$lte = new Date(to)
        }
    }

    // Setting Pagination options
    const pageNum = parseInt(page)
    const limitnum = parseInt(limit)
    const skip = (pageNum - 1) * limitnum

    // Using filters to query DB
    const schedules = await Schedule.find(filters)
        .populate('createdBy', 'name email')
        .populate('attendees', 'name email')
        .sort({startAt: 1})
        .skip(skip)
        .limit(limitnum)
        .select('__v')
    
    if(schedules.length === 0) {
        return res
               .status(400)
               .json(
                new ApiResponse(
                    400,
                    "No documents found"
                )
               )
    }
    
    const totalDocumentCount = await Schedule.countDocuments(filters)
    const totalPages = Math.ceil(totalDocumentCount/limitnum)
    
    return res
           .status(200)
           .json(
            new ApiResponse(
                200,
                {
                    schedules : schedules,
                    currentPage: pageNum,
                    totalPages: totalPages,
                    totalDocumentCount: totalDocumentCount,
                    limit: limitnum,
                    hasNextPage: pageNum < totalPages,
                    hasPrevPage: pageNum > 1
                }
            )
           )
    
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

    if(title) {
        trimmedTitle = title.trim()
        if(trimmedTitle && trimmedTitle !== currentSchedule.title) {
            currentSchedule.title = trimmedTitle
            isModified = true
        }
    }

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

const addStudentToSchedule = asyncHandler(async(req, res) => {
    const currentUser = req.user
    const {scheduleId, studentId} = req.body

    const student = await User.findOne({_id: studentId, role: 'student'})
    if(!student) {
        return res
               .status(400)
               .json(
                new ApiResponse(
                    400,
                    [],
                    'Student not found'
                )
               )
    }

    const schedule = await Schedule.findById(scheduleId)
    if(!schedule) {
        return res
               .status(400)
               .json(
                new ApiResponse(
                    400,
                    [],
                    'Schedule not found'
                )
               )
    }

    if(currentUser.role === 'staff' && schedule.createdBy.toString() !== currentUser._id.toString()) {
        throw new ApiError(403, "No access to add student to this schedule")
    }

    // Check if student already enrolled
    if(schedule.attendees.some(id => id.toString() === student._id.toString())) {
        return res
               .status(400)
               .json(
                new ApiResponse(
                    400,
                    [],
                    'Student already enrolled'
                )
               )
    }

    schedule.attendees.push(studentId)
    await schedule.save()

    return res
           .status(200)
           .json(
            new ApiResponse(
                200,
                schedule,
                'Student added to schedule'
            )
           )
})

const removeStudentFromSchedule = asyncHandler(async(req, res) => {
    const {scheduleId, studentId} = req.body
    const currentUser = req.user

    const schedule = await Schedule.findById(scheduleId)
    if(!schedule) {
        return res
               .status(400)
               .json(
                new ApiResponse(
                    400,
                    [],
                    'Schedule not found'
                )
               )
    }

    if(currentUser.role === 'staff' && schedule.createdBy.toString() !== currentUser._id.toString()) {
        throw new ApiError(403, "No access to remove student from this schedule")
    }

    schedule.attendees = schedule.attendees.filter(id => id.toString() !== studentId.toString())
    await schedule.save()

    return res
           .status(200)
           .json(
            new ApiResponse(
                200,
                schedule,
                'Student removed from schedule'
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
    deleteScheduleById,
    addStudentToSchedule,
    removeStudentFromSchedule
}
