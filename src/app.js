import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js"
import hostelRouter from "./routes/hostel.routes.js"
import reviewRouter from "./routes/review.routes.js"


const app = express()

app.use(express.json())
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/hostels", hostelRouter);
app.use("/api/hostel/:hostelId/reviews", reviewRouter);

export { app };