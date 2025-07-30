import mongoose from "mongoose";

export const connectDB= async ()=>{
    try {
        console.log("mongo_uri:",process.env.MONGO_URI);
        const conn=await mongoose.connect(process.env.MONGO_URI)
        console.log('MONGO DB connected');}

        catch(error){
            console.log("ERROR connection To Mongo DB",error.message);
            process.exit(1);
        }
        
    };