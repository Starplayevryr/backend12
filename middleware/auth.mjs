import jwt from 'jsonwebtoken'

const newAuth = (roles)=>{
    return (req,res,next)=>{
        const token = req.header('Authorization');
   
        if(!token) return res.status(401).json({message:'Access denied'});
    
    
    try{
        const verified = jwt.verify(token.split(' ')[1],'keerthana');
        console.log(verified);
        req.user = verified;

        if(!roles.includes(req.user.role))
              res.status(401).json({message:"access is denied..."});
                   next();
    }

    catch(err){
        res.status(400).json({message:"Invalid token"});
    }
}
}

export default newAuth;