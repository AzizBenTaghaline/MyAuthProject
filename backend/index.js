import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import authRoutes from "./routes/auth.routes.js"
import { connectDB } from './db/connectDB.js'
import cookieParser from 'cookie-parser'
import path from 'path'
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
const app=express();
const PORT=process.env.PORT||5000;
const __dirname = path.resolve();

app.use(cors({ origin: "http://localhost:5173", credentials:true}));

app.use(express.json()) 
app.use(cookieParser())

app.use("/api/auth",authRoutes)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'frontend/dist')));
    
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'dist', "index.html"));})
}

app.listen(PORT,()=>{
    connectDB();
    console.log('Its running on port',PORT);
}) 
//6bJDBSxZgKhGROvu / azizbtg