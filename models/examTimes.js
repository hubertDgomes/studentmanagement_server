import mongoose from "mongoose";
import { Schema } from "mongoose";

const examTimes = new Schema({
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
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
})

export default mongoose.model("examdetails", examTimes)