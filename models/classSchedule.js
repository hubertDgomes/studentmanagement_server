import mongoose from "mongoose";
import { Schema } from "mongoose";

const classScheduleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    classes: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    dayOfWeek: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    room: {
        type: String,
        default: ""
    },
    color: {
        type: String,
        default: "#6366f1"
    }
}, { timestamps: true })

export default mongoose.model("classschedule", classScheduleSchema)
