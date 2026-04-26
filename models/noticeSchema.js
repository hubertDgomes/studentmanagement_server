import mongoose from "mongoose";
import { Schema } from "mongoose";

const noticeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["General", "Exam", "Lab", "Holiday", "Event", "Urgent"],
        default: "General"
    },
    targetAudience: {
        type: String,
        enum: ["All", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5"],
        default: "All"
    },
    postedBy: {
        type: String,
        required: true
    }
}, { timestamps: true })

export default mongoose.model("notice", noticeSchema)
