import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"abdukhoshim99@gmail.com",
        pass:"fhka tlrc xgsi jcei"
    }
});

export const sendOTP = async (email, otp) => {
   return await transporter.sendMail({
        from:"'Transport sale' <abdukhoshim99@gamil.com>",
        to:email,
        subject:"Tasdiqlash Kodi ✅",
        html:`<h2>${otp}</h2>
        <p> Bu kodni hech kimga bermang </p>`
        

    });
}

//  res.status(200).send("Tasdiqlash kodi yuborildi ✅")

