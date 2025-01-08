import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { WebUser } from "../schema/webUserSchema.js";
import { sendEmail } from "../utils/sendMail.js";
import mongoose from "mongoose";

export const createWebUserController = async (req, res, next) => {
  try {
    let data = req.body;
    //to hash password
    let hashedPassword = await bcrypt.hash(data.password, 10);
    data = {
      ...data,
      password: hashedPassword,
      isVerifiedEmail: false,
    };
    let result = await WebUser.create(data);

    let infoObject = {
      _id: result._id,
    };

    let secretKey = process.env.SECRET_KEY;

    let expiryInfo = {
      expiresIn: "1d",
    };

    let token = await jwt.sign(infoObject, secretKey, expiryInfo);

    await sendEmail({
      to: result.email,
      subject: "Your Account Has Been Registered Successfully",
      html: `<H1> Thank You For registering on our database </H1>
              <P> To verify your email Click this link</P>
              <a href="http://localhost:3000/verify-email?token=${token}">http://localhost:3000/verify-email?token=${token}</a> `,
    });

    res.status(201).json({
      success: true,
      message: "Web User Created Successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: ("failed to create web User", error.message),
    });
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    let tokenString = req.headers.authorization; // <- this is token that we pasted in postman
    let tokenArray = tokenString.split(" "); // euta bearer ani euta token ma split huncha
    let token = tokenArray[1]; // array ma huncha so second object of array chai hamro token ho

    console.log(token);

    let secretKey = process.env.SECRET_KEY;

    let infoObj = await jwt.verify(token, secretKey);

    // console.log(infoObj);
    // infoObj gives this after being verified: { _id: '677e55cc658b836c2426d9d8', iat: 1736332748, exp: 1736419148 }

    let userId = infoObj._id;

    let result = await WebUser.findByIdAndUpdate(userId, {
      isVerifiedEmail: true,
    });

    console.log(result);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: ("email not verified", error.message),
    });
  }
};
