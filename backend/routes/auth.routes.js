import express from 'express'
import {signup , verifyEmail} from '../controllers/auth.controllers.js'
import { verify } from 'crypto';
const router=express.Router();

router.post('/signup',signup);

router.post('/login',(req,res)=>{
    res.send("login Route")
});

router.post('/logout',(req,res)=>{
    res.send("logout Route")
});
router.post('/verify-email',verifyEmail);

export default router;