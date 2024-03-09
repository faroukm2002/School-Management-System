import nodemailer from 'nodemailer'
import { htmlCode } from './html.js';
export const  sendEmail=async(options)=>{

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.nodeMailerEmail,
            pass: process.env.nodeMailerPassword, 
        },
    });
    
    
    const info = await transporter.sendMail({
        from: '"Route👻" <process.env.nodeMailerEmail>', // sender address
        to: options.email, // list of receivers
        subject: "Hello ✔", // Subject line
        html: htmlCode(`${process.env.BASEURL}/api/v1/auth/confirmEmail/${options.token}`) // html body
    });
    
      console.log("Message sent: %s", info.messageId);
}
