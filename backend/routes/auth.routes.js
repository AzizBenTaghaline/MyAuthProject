import express from 'express'
import {signup , verifyEmail , logout , login , forgotPassword, reset} from '../controllers/auth.controllers.js'
import bcryptjs from 'bcryptjs';

const router=express.Router();

router.post('/signup',signup);

router.post('/login',login);

router.post('/logout',logout);

router.post('/verify-email',verifyEmail);

router.post('/forgot-password',forgotPassword);

router.post('/reset-password/:token', reset);

export default router;