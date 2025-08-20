import express from 'express'
import { signup, verifyEmail, logout, login, forgotPassword, checkAuth, resetPassword } from '../controllers/auth.controllers.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router();

router.get('/check-auth', verifyToken, checkAuth)

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);

router.post('/reset-password/:token', resetPassword);


router.get('/reset-password/:token', (req, res) => {
    res.send(`Reset route is alive. Token: ${req.params.token}`);
});

export default router;