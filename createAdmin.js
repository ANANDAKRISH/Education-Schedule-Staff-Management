import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { User } from "./src/models/user.model.js";

const createAdmin = async(req, res) => {
    await mongoose.connect("connectionString/dbname")
    const password = "samplePassword"
    const hashedPassword = await bcrypt.hash(password, 10)

    const admin = await User.create({
        userName: "MainAdmin",
        password: hashedPassword,
        email: "adminMain@Securedemail.com",
        role: "admin",
        fullName: "fulName"
    })

    console.log("Admin created successfully");
    process.exit(0)
}

createAdmin()
