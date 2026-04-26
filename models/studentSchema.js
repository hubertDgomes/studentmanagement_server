import mongoose from "mongoose";
import { Schema } from "mongoose";

const studentSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    studentId : {
        type : String,
        required : true
    },
    dept : {
        type : String,
        required : true
    },
    semester : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['student' , 'admin'],
        default : 'student'
    }
})

export default mongoose.model("studentsData" , studentSchema)