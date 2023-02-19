import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types
const UserSchema= new mongoose.Schema({
  userName:{
    type:String,
    required:true,
    min:2,
    max:50,
  },
  email:{
    type:String,
    required:true,
    max:50,
    unique:true,
  },
  password:{
    type:String,
    required:true,
    min:4,
    max:50,
  },
  isadmin:{
    type:Boolean,
    default:false
  },
  picturePath:{
   type:String,
   default:"",
  },
  followers: 
    { type: Array, default: [] }
,

  following: 
    { type: Array, default: [] }
,
savedpost: 
    { type: Array, default: [] }
,

viewedProfile:{type:Number,default:10},

},
{timestamps:true}
);

const User = mongoose.model("users", UserSchema);
export default User;


