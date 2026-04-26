import express from "express";
import dbConnector from "./config/dbConnector.js";
import router from "./routes/allRouter.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin : "http://localhost:3000",
    credentials : true
}))


app.get("/" , (req, res) => {
    res.json({message : "The server is working"})
})

dbConnector()

app.use("/api" , router)

app.listen(4000, () => {
    console.log("The server is running!")
})