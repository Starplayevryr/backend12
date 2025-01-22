import mongoose from 'mongoose';

const connectDb = async()=>{
    try{
        await mongoose.connect('mongodb+srv://kirthiyamini826:London123@cluster0.ezs0z.mongodb.net/TestDB')
        console.log("Connected to database");
    }

    catch(error){
        console.log(`${error}`)
    }

}

export default connectDb;
    

    



