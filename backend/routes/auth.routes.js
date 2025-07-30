import express from 'express'
import {signup} from '../controllers/auth.controllers.js'
const router=express.Router();

router.post('/signup',signup);

router.post('/login',(req,res)=>{
    res.send("login Route")
});

router.post('/logout',(req,res)=>{
    res.send("logout Route")
});

export default router;