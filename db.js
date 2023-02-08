import dotenv from'dotenv';
dotenv.config();

import mongoose from 'mongoose';

mongoose.set('strictQuery', true);
 export const connectDb= async ()=>{
    try{
        await mongoose.connect(process.env.mongo_url)
       console.log(`mongodb connection is successfull`)
    }catch(error){
        console.log(`${error}`)
    }
};
// module.exports=connectDb;