import mongoose from "mongoose";
import dotenv from "dotenv";
import {DB_NAME} from "./constants.js";
import connectDB from "./db/db.js";

dotenv.config({
    path: './env'
})

connectDB();