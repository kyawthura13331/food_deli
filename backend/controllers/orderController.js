import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import stripe from "stripe";


const placeOrder = async (req, res) => {
  try {
    
    const newOrder = new orderModel({
      userId : req.body.userId,
      items : req.body.item,
      amount : req.body.amount,
      address:req.body.address
    })
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
  res.json({success:true,data:newOrder})
  } catch (error) {
res.json({success:false,message:error})
  }

};
const userOrder =async (req,res)=>{
  try {
    const orders = await orderModel.find({userId:req.body.userId})
    res.json({success:true,data:orders})
    
  } catch (error) {
    res.json({success:true,message:error})
  }
}

//For Admin order panel

const listOrders = async(req,res)=>{
  try {
    const orders = await orderModel.find({})
    res.json({success:true,data:orders})
  } catch (error) {
    res.json({success:false,message:error})
  }
}

/// api for updating order status
const updateStaus = async (req,res)=>{
  try { 
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
    res.json({success:true,message:"Status Updated"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"error at update status"})
    
  }
}
export { placeOrder , userOrder, listOrders,updateStaus };
