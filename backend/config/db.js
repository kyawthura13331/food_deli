import mongoose from "mongoose";
export const connectDB = async()=>{
    try {
        await mongoose.connect('mongodb+srv://kyawthura:11221212@cluster0.xpfhlwq.mongodb.net/food-delivery')
    .then(()=>console.log('DB connected'));
    } catch (error) {
        console.log(error);
        
    }
}