import express from "express";
import dbConnector from "./config/dbConnector.js";
import router from "./routes/allRouter.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import 'dotenv/config'
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin : ["https://studentmanagement-nf1z6crzh-hubert-gomes-projects.vercel.app"],
    credentials : true
}))


app.get("/" , (req, res) => {
    res.json({message : "The server is working"})
})

dbConnector()

app.use("/api" , router)

app.listen(PORT, () => {
    console.log("The server is running!")
})