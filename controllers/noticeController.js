import jwt from 'jsonwebtoken'
import 'dotenv/config'
import Notice from '../models/noticeSchema.js'

const addNotice = async (req, res) => {
    const token = req.cookies.token
    if (!token) return res.status(401).json({ message: "User not logged in" })

    const decoder = await jwt.verify(token, process.env.JWT_SECRET)
    if (decoder.role !== "admin") return res.status(403).json({ message: "Admin access required!" })

    const { title, content, category, targetAudience, postedBy } = req.body
    if (!title || !content || !postedBy) {
        return res.status(400).json({ message: "Title, content and author are required!" })
    }

    try {
        const notice = new Notice({ title, content, category, targetAudience, postedBy })
        await notice.save()
        return res.status(200).json({ message: notice })
    } catch (err) {
        return res.status(409).json({ message: err.message })
    }
}

const getNotices = async (req, res) => {
    try {
        const notices = await Notice.find().sort({ createdAt: -1 })
        return res.status(200).json({ notices })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const deleteNotice = async (req, res) => {
    const token = req.cookies.token
    if (!token) return res.status(401).json({ message: "User not logged in" })

    const decoder = await jwt.verify(token, process.env.JWT_SECRET)
    if (decoder.role !== "admin") return res.status(403).json({ message: "Admin access required!" })

    try {
        await Notice.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: "Notice deleted successfully" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

export default { addNotice, getNotices, deleteNotice }
