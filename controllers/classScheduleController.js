import jwt from 'jsonwebtoken'
import 'dotenv/config'
import classSchedule from '../models/classSchedule.js'

const addSchedule = async (req, res) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: "User not logged in" })
    }
    const decoder = await jwt.verify(token, process.env.JWT_SECRET)
    if (decoder.role !== "admin") {
        return res.status(403).json({ message: "Admin access required!" })
    }
    const { title, classes, subject, teacher, dayOfWeek, startDate, endDate, startTime, endTime, room, color } = req.body
    if (!title || !classes || !subject || !teacher || !dayOfWeek || !startDate || !endDate || !startTime || !endTime) {
        return res.status(400).json({ message: "All required fields must be filled!" })
    }
    try {
        const schedule = new classSchedule({ title, classes, subject, teacher, dayOfWeek, startDate, endDate, startTime, endTime, room, color })
        await schedule.save()
        return res.status(200).json({ message: "Schedule added", schedule })
    } catch (err) {
        return res.status(409).json({ message: err.message })
    }
}

const getSchedules = async (req, res) => {
    try {
        const schedules = await classSchedule.find().sort({ startDate: 1 })
        return res.status(200).json({ schedules })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const deleteSchedule = async (req, res) => {
    const token = req.cookies.token
    if (!token) return res.status(401).json({ message: "User not logged in" })
    const decoder = await jwt.verify(token, process.env.JWT_SECRET)
    if (decoder.role !== "admin") return res.status(403).json({ message: "Admin access required!" })
    try {
        await classSchedule.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: "Schedule deleted" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

export default { addSchedule, getSchedules, deleteSchedule }
