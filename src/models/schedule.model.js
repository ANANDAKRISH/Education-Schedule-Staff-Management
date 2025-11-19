import mongoose, {Schema} from "mongoose";

const scheduleScehma = new Schema(
    {
        title  : {
            type: String,
            required: true,
            trim: true
        },
        yearNo : {
            type: Number,
            required: true
        },
        semesterNo : {
            type: Number,
            required: true
        },
        batch: {
            type: String,
            required: true,
            uppercase: true
        },
        startAt: {
            type: Date,
            required: true
        },
        endAt: {
            type: Date,
            required: true
        },
        attendees: [
            {
                type: Schema.Types.ObjectId,
                ref: "user"
            }
        ],
        createdBy : {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {timestamps: true}
)

export const Schedule = mongoose.model("Schedule", scheduleScehma)