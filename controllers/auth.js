import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Otp from '../models/Otp.js';
import User from '../models/User.js';
import {mailerfun} from '../utilities/mailer.js'
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
       if (!ispasswordvalid) return res.status(400).json({ msg: "Invalid passoword. " });

       const token = jwt.sign({ id: user._id },'secrethbhaikyahikarlengajanke');
       
       res.status(200).json({ token, user });

    }catch(err)
    {
    res.status(500).json({ error: err.message });
    }
};

//forgot password 
export const forgotpassword=async (req, res) => {


    const user = await User.findOne({
        email: req.body.email,

    })
    if (!user) {
        res.json({ status: 'error', error: 'Invalid email' })
    }

    if (user) {
        const mailid = req.body.email;

        const genratedOTP = Math.floor(100000 + Math.random() * 900000)
        

        const text = `Your OTP is ${genratedOTP}`;
        mailerfun(mailid, 'OTP', text);

        try {

            const otpdata = await Otp.findOne({
                email: req.body.email,

            })

            /* if email found in otp table */
            if (otpdata) {

                /* update the otp and expiry time */
                let update = {
                    otp: genratedOTP,
                    exipiresOn: new Date().getTime() + 5*60 * 1000,
                }
                let doc = await Otp.findOneAndUpdate({ email: req.body.email }, update, {
                    returnOriginal: false
                });

            } else {

                const otp = await Otp.create({

                    email: req.body.email,
                    otp: genratedOTP,
                    exipiresOn: new Date().getTime() + 5*60 * 1000, /* expires in 5 min */

                })
            }

            console.log("")

        } catch (error) {
            console.log(error);
        }
        console.log(text)
        res.json({ status: 'success', message: 'mail sent enter otp', mailmessage: text })
    }
};


export const matchotp=async(req, res) => {


    const otpdata = await Otp.findOne({
        email: req.body.email,

    })
    if (!otpdata) {
        return res.json({ status: 'error', error: 'Invalid email' })
    }

    if (otpdata) {

        /* check if the otp present in the table is expired or not */

        /* remaining time = expiry time - current time */
        let remainingtime = otpdata.exipiresOn - new Date().getTime();
        if (remainingtime > 0) {

            const enteredOtp = `${req.body.otpnumber}`;
            console.log("database otp =" + otpdata.otp);
            console.log("entered otp =" + enteredOtp);

            if (otpdata.otp == enteredOtp) {
                console.log("database otp =" + otpdata.otp);

                res.json({ status: 'success', message: 'Verified' })

            }
            else {
                console.log("nahi hua");
                res.json({ status: 'failed', message: 'OTP didnt match' })
            }
        }
        else {
            res.json({ status: 'failed', message: 'OTP Expired' })
        }

    }
};

export const changepassword=async (req, res) => {


    const user = await User.findOne({
        email: req.body.email,

    })


    if (!user) {
        return res.json({ status: 'error', error: 'Invalid email' })
    }

    /* check if the email present in the table or not */

    if (user) {

        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        let update = {
            password: hashedPassword,
        }
        let doc = await User.findOneAndUpdate({email:req.body.email},update , {
            returnOriginal: false
        });
        if (doc) {
            console.log(doc)
            res.json({ status: 'success', message: 'Password Changed' })
        }
        else{
            console.log("failed",doc)

            res.json({ status: 'failed', message: 'Couldnt change the password' })

        }

    }
    else {
        res.json({ status: 'failed', message: 'User Not Found' })
    }

};
