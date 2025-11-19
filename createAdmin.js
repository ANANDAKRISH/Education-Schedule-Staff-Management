import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { User } from "./src/models/user.model.js";

const createAdmin = async(req, res) => {
    await mongoose.connect("mongodb+srv://anandu235_db_user:l2wRHRh1YMtxUjV8@educationschedule.eohrt0e.mongodb.net/EducationSchedule")
    const password = "Admin@123"
    const hashedPassword = await bcrypt.hash(password, 10)

    const admin = await User.create({
        userName: "MainAdmin",
        password: hashedPassword,
        email: "adminMain@Securedemail.com",
        role: "admin",
        fullName: "Anand"
    })

    console.log("Admin created successfully");
    process.exit(0)
}

createAdmin()