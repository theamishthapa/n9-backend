import nodemailer from "nodemailer";

// The main thing in this file is transporterInfo and mailInfo
const transporterInfo = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    //user and pass must be genuine
    user: "amishthapa805@gmail.com",
    pass: "pxio tyaz gqyz ofmc",

    //use 2 step verification and generate app password
  },
};

export const sendEmail = async (mainInfo) => {
  try {
    let transporter = nodemailer.createTransport(transporterInfo);
    let info = await transporter.sendMail(mainInfo);
  } catch (error) {
    console.log("error has occured", error.message);
  }
};
