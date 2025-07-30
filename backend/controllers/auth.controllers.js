import {User} from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from '../mailtrap/emails.js';
import { generateTokenAndSetCookie } from '../tools/generateTokenAndSetCookie.js';

export const signup= async(req,res)=>{
    const{email,password,name}=req.body;
    try {
        if(!email||!password || !name) {
            throw new Error("All fields are required");
        }
        const userAlreadyExists= await User.findOne({email});
        if (userAlreadyExists){
            return res.status(400).json({success:false , message:"user already exists"});
        }
        const hashedPassword= await bcrypt.hash(password,10)
        const verificationToken=Math.floor(100000+Math.random() * 900000).toString()

        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt:new Date(Date.now()+24 * 60 * 60 * 1000),
        })
        await user.save();

        generateTokenAndSetCookie(res,user._id)

       await sendVerificationEmail(user.email,verificationToken);

        res.status(201).json({
            success:true ,
            message:"User created!!",
            ...user._doc,
            password:undefined});
    }catch (error){
        res.status(400).json({success:false , message:error.message});
    }



}