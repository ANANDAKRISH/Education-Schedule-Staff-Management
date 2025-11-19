import { Schedule } from "../models/schedule.model.js";
import { ApiError } from "../utilities/ApiError.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { asyncHandler } from "../utilities/asyncHandler.js";


const createSchedule = asyncHandler(async(req, res) => {
    const {title, yearNo, semesterNo, batch, startAt, endAt} = req.body
    const currentStaff = req.user

    if(!title || !yearNo || !semesterNo || !batch || !startAt || !endAt) {
        throw new ApiError(400, "All fields are required")
    }

    const startDate = new Date(startAt)
    const endDate = new Date(endAt)

    if(isNaN(startDate) || isNaN(endDate)) {
        throw new ApiError(400, "Inavalid date format")
    }

    if(endDate < startDate) {
        throw new ApiError(400, "End date cannot be earlier than start date")
    }

    const createdSchedule = await Schedule.create({
        title: title,
        yearNo: yearNo,
        semesterNo: semesterNo,
        batch: batch,
        startAt: startDate,
        endAt: endDate,
        createdBy: currentStaff._id
    })

    if(!createdSchedule) {
        throw new ApiError(500, "Something went wrong while creating the schedule")
    }

    return res
           .status(200)
           .json(
            new ApiResponse(
                200,
                createdSchedule,
                "Schedule created successfully"
            )
           )
})

export {
    createSchedule
}