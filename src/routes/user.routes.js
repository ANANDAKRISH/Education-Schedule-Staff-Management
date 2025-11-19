import { Router } from "express";
import { authorizeRoles, verifyJWT } from "../middlewares/auth.middleware.js";
import { addStudentToSchedule, deleteScheduleById, getScheduleById, getSchedules, getStaffById, getStudentById, removeStudentFromSchedule, updateScheduleById, updateStaffById, updateStudentById } from "../controllers/user.controller.js";

const router = Router()

// Secured Routes
router.route("/student/:studentId").get(verifyJWT,authorizeRoles("admin", "student"), getStudentById)
router.route("/staff/:staffId").get(verifyJWT, authorizeRoles("admin", "staff"), getStaffById)
router.route("/student/:studentId").patch(verifyJWT,authorizeRoles("admin", "student"), updateStudentById)
router.route("/staff/:staffId").patch(verifyJWT, authorizeRoles("admin", "staff"), updateStaffById)
router.route("/schedules").get(verifyJWT, getSchedules)
router.route("/schedule/:scheduleId").get(verifyJWT, getScheduleById)
router.route("/schedule/:scheduleId").patch(verifyJWT, authorizeRoles("staff", "admin"), updateScheduleById)
router.route("/schedule/:scheduleId").delete(verifyJWT, authorizeRoles("admin"), deleteScheduleById)
router.route("/student-addition").patch(verifyJWT, authorizeRoles("staff", "admin"), addStudentToSchedule)
router.route("/student-removal").patch(verifyJWT, authorizeRoles("staff", "admin"), removeStudentFromSchedule)

export default router