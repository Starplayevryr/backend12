import epxress from 'express';
import bcrypt from 'bcrypt'
import userModel from '../models/Users.mjs';
import authorize from '../middleware/auth.mjs';
import jwt from 'jsonwebtoken';

const router = epxress.Router();

router.post('/register',async(req,res)=>{
  const{username,email,password,role}=req.body;

  try{
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt);

    const newUser  = new userModel({
        username,email,password:hashPassword
    })

    await newUser.save();
    if(!newUser )
      res.status.json({message:"user already exists!!!"})

    res.status(200).json({message:'registartion successful....'});
  }
  catch(error){
    console.error(error);
    res.status(500).json({message:'internal server error'});
  }
}
);

router.post('/login',async(req,res)=>{
  const {username,password} = req.body;
  try{
    const user = await userModel.findOne({username})
    console.log(user)
    if(!user)
        res.status(401).json({message:'user not found'})

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch)
         return res.json({message:'invalid credentials'})
    
    const token = jwt.sign({id:user._id,role:user.role},"keerthana",{expiresIn:'20m'})

    res.json({token})

  }
  catch(error){
    res.status(500).json({message:"server error"})
  }
})


router.get('/',authorize(['user']),async(req,res)=>{
    const user = await userModel.findById(req.user.id).select('-password')
    res.json({user})

});


export default router;

