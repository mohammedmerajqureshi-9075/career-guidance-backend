import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser'
import { connectingToDb } from "./db/connection.js";
import userRoutes from "./routes/userAuthRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

import bookmarkRouter from "./routes/bookmarkRoutes.js";
import careerRouter from "./routes/careerRoutes.js";
import os from "os";



dotenv.config();

const app = express();
app.get("/", (req, res) => {
  res.send(`Hello from worker PID: ${process.pid}`);
});
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());

//User
app.use("/api/auth/user",userRoutes)
//Admin
app.use("/subadmin",adminRouter)


app.use('/api/blog', blogRouter);
app.use('/api/bookmark',bookmarkRouter)



app.use("/api/careers", careerRouter);
console.log("CPU Cores detected:", os.cpus().length);




let dbString = process.env.DB_STRING;
let port = process.env.PORT;

connectingToDb(dbString)





app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port} ${process.pid}`);
});



