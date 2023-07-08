import Jwt  from "jsonwebtoken";
export const verifyToken = async (req,res,next)=>{
    try {
        
        let token = req.header("Authorization")
        if(!token){
            res.status(403).json({message:"access denied "})
        }
        if(token.startsWith("Bearer ")){
            token = token.slice(7 , token.length).trimLeft()
        }
        const verified = Jwt.verify(token , process.env.JWT_SECRET);
        req.user = verified
        next()
    } catch (error) {
        res.status(500).json({error : err.message})
    }
}