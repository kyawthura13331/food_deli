import express from 'express'
import authmiddleware from '../middleware/auth.js'
import {listOrders, placeOrder, updateStaus, userOrder} from '../controllers/orderController.js'

const orderRouter = express.Router();

orderRouter.post("/place",authmiddleware,placeOrder)
orderRouter.post("/userorder",authmiddleware,userOrder)
orderRouter.get("/list",listOrders)
orderRouter.post("/status",updateStaus)
export default orderRouter