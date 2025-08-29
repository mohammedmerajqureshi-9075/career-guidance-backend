import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser'
import { connectingToDb } from "./db/connection.js";
import userRoutes from "./routes/userAuthRoutes.js";



dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());

//User
app.use("/api/auth/user",userRoutes)



let dbString = process.env.DB_STRING;
let port = process.env.PORT;

connectingToDb(dbString)


app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
