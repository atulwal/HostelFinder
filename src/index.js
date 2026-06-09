import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { app } from "./app.js"

dotenv.config({
    path: './.env'
})

connectDB();