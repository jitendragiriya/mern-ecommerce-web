const nodeMailer = require('nodemailer')

const sendMail = async (options)=>{
    const transporter = nodeMailer.createTransport({
        service: process.env.SMPT_SERVICE,
        port: process.env.SMPT_PORT,
        secure: false,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD
        }
    })

    const mailOptions = {
        from:process.env.SMPT_MAIL,
        to: options.email ,
        subject:options.subject,
        text:options.message,
    }

    await transporter.sendMail(mailOptions)
};

module.exports = sendMail;