import mongoose from 'mongoose';

const itemSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})


const itemModel = mongoose.model("item2",itemSchema)

export default itemModel;