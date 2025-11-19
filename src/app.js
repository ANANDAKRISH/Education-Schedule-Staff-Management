import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"


const app = express()

// Global Middlewares

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


app.use(express.json({
    limit: "16kb"
}))

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

app.use(cookieParser())

// Routes import
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import adminRouter from './routes/admin.routes.js'
import staffRouter from './routes/staff.routes.js'

// Routes declaration
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/admins", adminRouter)
app.use("/api/v1/staffs", staffRouter)

export {app}