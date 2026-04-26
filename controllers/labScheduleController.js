import jwt from 'jsonwebtoken'
import 'dotenv/config'
import labSchedule from '../models/labSchedule.js'

const addLabSchedule = async (req, res) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: "User not logged in" })
    }
    const decoder = await jwt.verify(token, process.env.JWT_SECRET)
    if (decoder.role !== "admin") {
        return res.status(403).json({ message: "Admin access required!" })
    }

    const { date, classes, subject, labRoom, startTime, endTime, teacher } = req.body
    if (!date || !classes || !subject || !labRoom || !startTime || !endTime || !teacher) {
        return res.status(400).json({ message: "All fields are required!" })
    }

    try {
        const entry = new labSchedule({ date, classes, subject, labRoom, startTime, endTime, teacher })
        await entry.save()
        return res.status(200).json({ message: entry })
    } catch (err) {
        return res.status(409).json({ message: err.message })
    }
}

const getLabSchedules = async (req, res) => {
    try {
        const labs = await labSchedule.find().sort({ date: 1 })
        return res.status(200).json({ labs })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const deleteLabSchedule = async (req, res) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: "User not logged in" })
    }
    const decoder = await jwt.verify(token, process.env.JWT_SECRET)
    if (decoder.role !== "admin") {
        return res.status(403).json({ message: "Admin access required!" })
    }
    try {
        await labSchedule.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: "Deleted successfully" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

export default { addLabSchedule, getLabSchedules, deleteLabSchedule }
