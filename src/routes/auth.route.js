import express from 'express'
import { login, register } from '../controllers/auth.controller.js'
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
// router.post('/refresh-token', refreshToken);
router.get('/me', protect , (req, res)=> {
    res.status(200).json({ user: req.user });
});

export default router;