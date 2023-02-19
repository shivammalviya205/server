import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';

 export const mailerfun=(to,subject,text)=>{
const msg={
    from:'shivammalviya502@gmail.com',
    to,
    subject,
    text,

}
 
nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'shivammalviya502@gmail.com',
        pass:process.env.Nodemailerpswd,
    },
    port:465,
    host:'smtp.gmail.com'
}) 
.sendMail(msg,(err)=>{
    if(err){
        return console.log(err);
    }
    else {
        return console.log('email sent')
    }
})
} 
 