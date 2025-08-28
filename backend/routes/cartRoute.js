import express from 'express'
import {removeCart,getCart, addtoCart} from '../controllers/cartController.js'
import authMiddleware from '../middleware/auth.js'

const  cartRouter= express.Router()

cartRouter.post("/add",authMiddleware, addtoCart)
cartRouter.post("/remove",authMiddleware,removeCart)
cartRouter.get("/get",authMiddleware,getCart)

export default cartRouter;