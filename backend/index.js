import dotenv from 'dotenv'
import express from 'express'
import authRoutes from "./routes/auth.routes.js"
import { connectDB } from './db/connectDB.js'
import cookieParser from 'cookie-parser'
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
const app=express();
const PORT=process.env.PORT||5000;

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoutes)

app.listen(PORT,()=>{
    connectDB();
    console.log('Its running on port',PORT);
}) 
//6bJDBSxZgKhGROvu / azizbtg