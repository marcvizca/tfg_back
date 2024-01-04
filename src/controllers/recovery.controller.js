import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import {pool} from '../database.js'

dotenv.config();


export const recoveryPwd = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM user WHERE email=?', [email])
        if (rows.length === 0) return res.status(409).json( {
            message: 'Aquest usuari no està registrat al sistema'
        })
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.APP_EMAIL,
                pass: process.env.EMAIL_PWD,
            },
        });

        const mail_configs = {
            from: process.env.APP_EMAIL,
            to: email,
            subject: "Athelete Control Tracker Recovery Password",
            html: `<!DOCTYPE html>
            <html lang="en" >
            <head>
            <meta charset="UTF-8">
            <title>OTP Email Template</title>
            
            
            </head>
            <body>
            <!-- partial:index.partial.html -->
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #ffa500;text-decoration:none;font-weight:600">Athlete Control Tracker</a>
                </div>
                <p style="font-size:1.1em">Hi,</p>
                <p>Thank you for choosing Athelete Control Tracker. Use the following code to complete your Password Recovery Procedure. This code is valid for 5 minutes</p>
                <h2 style="background: #ffa500;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
                <p style="font-size:0.9em;">Regards,<br />Athlete Control Tracker Team</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>Athlete Control Tracker Inc</p>
                <p>UPC</p>
                <p>Barcelona</p>
                </div>
            </div>
            </div>
            <!-- partial -->
            
            </body>
            </html>`,
        };

        const info = await transporter.sendMail(mail_configs);
        res.status(200).json({message: 'Email sent succesfully'})
    } catch (error) {
        return res.status(500).json({message:'An error has ocurred'});
    }
}