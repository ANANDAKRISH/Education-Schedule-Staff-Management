import { Router } from "express";
import { authorizeRoles, verifyJWT } from "../middlewares/auth.middleware.js";
import { createSchedule } from "../controllers/staff.controller.js";

const router = Router()

router.route("/schedule").post(verifyJWT, authorizeRoles("staff"), createSchedule)

export default router