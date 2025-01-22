import mongoose from 'mongoose';

const connectDb = async()=>{
    try{
        await mongoose.connect('')
        console.log("Connected to database");
    }

    catch(error){
        console.log(`${error}`)
    }

}

export default connectDb;
    

    



