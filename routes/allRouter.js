import express from "express";
import authentication from "../controllers/authentication.js";
import exam from "../controllers/examController.js";
import schedule from "../controllers/classScheduleController.js";
import lab from "../controllers/labScheduleController.js";
import notice from "../controllers/noticeController.js";
const router = express.Router()

router.post("/signup", authentication.signupController)
router.post("/login", authentication.loginController)
router.get("/logout", authentication.logoutController)
router.get("/profile", authentication.getProfile)
router.post("/addexam" , exam.examController)
router.get("/showexam" , exam.showExams)

router.post("/addschedule", schedule.addSchedule)
router.get("/getschedules", schedule.getSchedules)
router.delete("/deleteschedule/:id", schedule.deleteSchedule)

router.post("/addlabschedule", lab.addLabSchedule)
router.get("/getlabschedules", lab.getLabSchedules)
router.delete("/deletelabschedule/:id", lab.deleteLabSchedule)

router.post("/addnotice", notice.addNotice)
router.get("/getnotices", notice.getNotices)
router.delete("/deletenotice/:id", notice.deleteNotice)

export default router