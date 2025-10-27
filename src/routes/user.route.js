import express from 'express'

const userRouter = express.Router();

userRouter.get('/profile', getProfile);
userRouter.post('/login', login);
userRouter.post('/register', register);

export default userRouter;