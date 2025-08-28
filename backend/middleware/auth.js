import jwt from 'jsonwebtoken'

const authMiddleware = async (req , res ,next)=>{
    const {token}= req.headers;
    if(!token){
        return res.json({success:false,message:"Not Authorized Login Again"})
    }
    try{
        const token_decode= jwt.verify(token,process.env.JWT_SECRET);
        console.log(token_decode)
        req.userId = token_decode.id;
    
        console.log(token_decode," requested user.")
        next()
    }catch(error)
    {
        console.error(error.message)
    }
}
export default authMiddleware;