import connectDB from "./db/db_connection.js";
import dotenv from "dotenv"
import { app } from "./app.js";

dotenv.config({
    path: './.env'
})

connectDB()
.then(() => {
    app.on('error', (error) => {
        console.log("Following errors in express application: ", error);
    })

    app.listen(process.env.PORT || 8000, () => {
        console.log(`App is listening to the port: ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log('MonoDB connection failed due to the folowing error : ', err);
})

