import mongoose from "mongoose";

const OtpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    otp:{
     type:String,
     required:true
    },
    exipiresOn:{
     type:Number,required:true
    }
},
    {timestamps:true},
)

const Otp = mongoose.model("Otp", OtpSchema);
export default Otp;

