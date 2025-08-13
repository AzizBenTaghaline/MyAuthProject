import {User} from '../models/user.model.js'
import bcryptjs from 'bcryptjs';
import { sendVerificationEmail, sendWelcomeEmail,sendPasswordResetEmail,sendResetSuccessEmail} from '../mailtrap/emails.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import crypto from 'crypto';

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
        const hashedPassword= await bcryptjs.hash(password,10)
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

export const verifyEmail = async (req, res) => {
    const {code} = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt:Date.now() }
        });
    if (!user) {
        return res.status(400).json({success: false, message: "Invalid or expired verification code"});
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
        success: true,
        message: "Email verified successfully",
    user: {
        ...user._doc,
        password: undefined,
    },});
}catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({success: false, message:error.message ||"Server error"});}
}

export const logout= async(req,res)=> {
    res.clearCookie('token');
    res.status(200).json({success:true, message:"Logged out successfully"});
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid password" });
        }
        generateTokenAndSetCookie(res, user._id);
        user.lastLogin= new Date();
        await user.save();
        res.status(200).json({
            success:true,
            message:"Login successfully",
            user: {
                ...user._doc,
                password: undefined,
            },});
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({success:false, message:error.message || "Server error"});
    };
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        const resetToken =crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt= new Date(Date.now() + 60 * 60 * 1000);
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt=resetTokenExpiresAt;
        await user.save();
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({
            success: true,
            message: "Password reset email sent successfully",
        });
    } catch (error) {
        console.error("Forgot password error:", error);
        res.status(400).json({ success: false, message: error.message || "Server error" });
    };
};

export const resetPassword = async (req, res) => {
    try {
        const token = req.params.token;
        if (!token) {
            return res.status(400).json({ 
                success: false, 
                message: "Reset token is required" 
            });
        }
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid or expired reset token" 
            });
        }
        
        const hashedPassword = await bcryptjs.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({ 
            success: true, 
            message: "Password reset successful" 
        });
    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({ 
            success: false, 
            message: error.message || "Server error" 
        });
    }
};

export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};