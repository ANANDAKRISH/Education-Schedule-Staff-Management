import { Router } from "express";
import { authorizeRoles, verifyJWT } from "../middlewares/auth.middleware.js";
import { addStudentToSchedule, deleteScheduleById, getScheduleById, getSchedules, getStaffById, getStudentById, removeStudentFromSchedule, updateScheduleById, updateStaffById, updateStudentById } from "../controllers/user.controller.js";

const router = Router()


router.route("/student/:id").get(verifyJWT,authorizeRoles("admin", "student"), getStudentById)
router.route("/staff/:id").get(verifyJWT, authorizeRoles("admin", "staff"), getStaffById)
router.route("/student/:id").patch(verifyJWT,authorizeRoles("admin", "student"), updateStudentById)
router.route("/staff/:id").patch(verifyJWT, authorizeRoles("admin", "staff"), updateStaffById)
router.route("/schedules").get(verifyJWT, getSchedules) // Query params ?
router.route("/schedule/:id").get(verifyJWT, getScheduleById)
router.route("/schedule/:id").patch(verifyJWT, authorizeRoles("staff", "admin"), updateScheduleById)
router.route("/schedule/:id").delete(verifyJWT, authorizeRoles("admin"), deleteScheduleById)
router.route("/student-addition").patch(verifyJWT, authorizeRoles("staff", "admin"), addStudentToSchedule)
router.route("/student-removal").patch(verifyJWT, authorizeRoles("staff", "admin"), removeStudentFromSchedule)

export default router