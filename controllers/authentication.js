import studentSchema from "../models/studentSchema.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import 'dotenv/config'


const signupController = async (req, res) => {
    const { email, password, name, studentId, dept, semester } = req.body
    if (!email || !password || !name || !studentId || !dept || !semester) {
        return res.status(400).json({ message: "All fields are required!" })
    }
    try {
        const checkEmail = await studentSchema.findOne({ email })
        if (checkEmail) {
            return res.status(409).json({ message: "Students already registered! Try to login." })
        }
        bcrypt.hash(password, 10, async function (err, hash) {
            const newUser = await studentSchema({
                email,
                password: hash,
                name,
                studentId,
                dept,
                semester
            })
            await newUser.save()
            const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: "2d" })
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none"
            })
            return res.status(200).json({ message: "Signup Completed!" })
        });

    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const loginController = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "Empty Credential!" })
    }
    try {
        const checkUser = await studentSchema.findOne({ email })
        if (!checkUser) {
            return res.status(404).json({ message: "Email not registered yet. Try to signup." })
        }
        const checkPasword = await bcrypt.compare(password, checkUser.password)
        if (!checkPasword) {
            return res.status(401).json({ message: "Invalid Password" })
        }
        let token = jwt.sign({ id: checkUser._id, role: checkUser.role }, process.env.JWT_SECRET, { expiresIn: "2d" })
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })
        return res.status(200).json({
            message: "Login Successfull!", user: {
                id: checkUser._id,
                name: checkUser.name,
                email: checkUser.email,
                dept: checkUser.dept,
                semester: checkUser.semester,
                studentId: checkUser.studentId,
                role: checkUser.role
            }
        })
    }
    catch (err) {
        return res.status(404).json({ message: err.message })
    }
}

const logoutController = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        })
        return res.status(200).json({
            message: "Logout Successfully"
        });
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const getProfile = async (req, res) => {
    const token = req.cookies.token
    if (!token) return res.status(401).json({ message: "User not logged in" })
    try {
        const decoder = jwt.verify(token, process.env.JWT_SECRET)
        const user = await studentSchema.findById(decoder.id).select("-password")
        if (!user) return res.status(404).json({ message: "User not found" })
        return res.status(200).json({ user })
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" })
    }
}



export default { signupController, loginController, logoutController, getProfile }