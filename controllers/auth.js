import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/* Register user */
export const register=async(req,res)=>{
    console.log('coming')
           try {
                const {userName,email,password}=req.body;
                const image = req.file.filename;
                const newpassword=await bcrypt.hash(password,10)
                const user=await User.create({
                    userName:userName,
                    email:email,
                    password:newpassword,
                    picturePath:image,
            
                });
                const msg="user registered succesfull"
                res.status(201).json(msg);
               } catch (err) {
                res.status(501).json({ error: err.message });
               }
        
}; 




/*Log in */
export const login=async(req,res)=>{
     
    try{
      const {email,password}=req.body;
      const user=await User.findOne({email:email});
       if(!user) return res.status(400).json({msg:"User does not exist"});

       const ispasswordvalid=await bcrypt.compare(password,user.password)
       if (!ispasswordvalid) return res.status(400).json({ msg: "Invalid credentials. " });

       const token = jwt.sign({ id: user._id },'secrethbhaikyahikarlengajanke');
       
       res.status(200).json({ token, user });

    }catch(err)
    {
    res.status(500).json({ error: err.message });
    }
};

