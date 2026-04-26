import mongoose from "mongoose";
import { Schema } from "mongoose";

const labScheduleSchema = new Schema({
    date: {
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
    labRoom: {
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
    teacher: {
        type: String,
        required: true
    }
}, { timestamps: true })

export default mongoose.model("labschedule", labScheduleSchema)
