import { Router } from "express";
import { authorizeRoles, verifyJWT } from "../middlewares/auth.middleware.js";
import { deleteStaffById, deleteStudentfById, getAllStaffs, getAllStudents, registerUser } from "../controllers/admin.controller.js";

const router = Router()

router.route("/register-user").post(verifyJWT, authorizeRoles("admin"), registerUser)
router.route("/students").get(verifyJWT, authorizeRoles("admin"), getAllStudents)
router.route("/staffs").get(verifyJWT, authorizeRoles("admin"), getAllStaffs)
router.route("/staff-delete/:id").delete(verifyJWT, authorizeRoles("admin"), deleteStaffById)
router.route("/student-delete/:id").delete(verifyJWT, authorizeRoles("admin"), deleteStudentfById)

export default router