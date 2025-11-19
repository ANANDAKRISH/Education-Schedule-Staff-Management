import { Router } from "express";
import { userLogin, userLogout } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/login").post(userLogin)

// Secured Routes
router.route("/logout").post(verifyJWT, userLogout)

export default router
