import express from 'express'
import { LoginUser,RegisterUser,getUserProfile } from '../controllers/userController.js'
import authMiddleware from '../middleware/auth.js'


const  userRouter = express.Router()

userRouter.post("/register",RegisterUser)
userRouter.post('/login',LoginUser)
userRouter.get("/profile",authMiddleware, getUserProfile);
export default userRouter