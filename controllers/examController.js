import jwt from 'jsonwebtoken'
import 'dotenv/config'
import examTimes from '../models/examTimes.js'
const examController = async (req, res) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(404).json({ message: "User not loged in" })
    }
    const decoder = await jwt.verify(token, process.env.JWT_SECRET)
    if (decoder.role != "admin") {
        return res.status(404).json({ message: "Admin are required to use that dashboard!" })
    }
    const { date, classes, subject, startTime, endTime } = req.body
    if (!date || !classes || !subject || !startTime || !endTime) {
        return res.status(404).json({ message: "All fields are required!" })
    }
    try {
        const examData = await examTimes({
            date,
            classes,
            subject,
            startTime,
            endTime
        })
        examData.save()
        return res.status(200).json({ message: examData })
    }
    catch (err) {
        return res.status(409).json({ message: err.message })
    }
}

const showExams = async (req, res) => {
    try {
        const getExam = await examTimes.find()
        return res.status(200).json({ exam: getExam })
    }
    catch (err) {
        return res.status(404).json(err.message)
    }
}

export default {examController , showExams}