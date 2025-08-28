import jwt from 'jsonwebtoken'

const authMiddleware = async (req , res ,next)=>{
    const {token}= req.headers;
    if(!token){
        return res.json({success:false,message:"Not Authorized Login Again"})
    }
    try{
        const token_decode= jwt.verify(token,process.env.JWT_SECRET);
      
        req.userId = token_decode.id;
    
        console.log(req.userId ," requested user.")
        next()
    }catch(error)
    {
        console.error(error.message)
    }
}
export default authMiddleware;