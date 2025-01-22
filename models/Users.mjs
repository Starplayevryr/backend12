import mongoose from 'mongoose';
import bcrypt from 'bcrypt'


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
     type:String,
     enum:['admin','user'],
     default:'user'
    },
    date:{
        type:Date,
        default:Date.now()
    }
});



const userModel = mongoose.model('user1',userSchema);
export default userModel;
