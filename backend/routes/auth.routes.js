import express from 'express'
import {signup , verifyEmail , logout , login , forgotPassword, reset ,checkAuth } from '../controllers/auth.controllers.js'
import {verifyToken } from '../middleware/verifyToken.js';
import bcryptjs from 'bcryptjs';

const router=express.Router();

router.post('/signup',signup);

router.post('/login',login);

router.post('/logout',logout);

router.post('/verify-email',verifyEmail);

router.post('/forgot-password',forgotPassword);

router.post('/reset-password/:token', reset);

router.get('/check-auth',verifyToken,checkAuth)

export default router;