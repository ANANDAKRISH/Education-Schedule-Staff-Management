import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { User } from "./src/models/user.model.js";

const createAdmin = async(req, res) => {
    await mongoose.connect("connectionString/dbName")
    
    const admin = await User.create({
        userName: "",
        password: "",
        email: "",
        role: "",
        fullName: ""
    })

    console.log("Admin created successfully");
    process.exit(0)
}

createAdmin()