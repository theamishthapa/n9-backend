import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { WebUser } from "../schema/webUserSchema.js";
import { sendEmail } from "../utils/sendMail.js";
import mongoose from "mongoose";

// create webuser
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

// verify email
export const verifyEmail = async (req, res, next) => {
  try {
    let tokenString = req.headers.authorization; // <- this is token that we pasted in postman
    let tokenArray = tokenString.split(" "); // euta bearer ani euta token ma split huncha
    let token = tokenArray[1]; // array ma huncha so second object of array chai hamro token ho

    let secretKey = process.env.SECRET_KEY;

    let infoObj = await jwt.verify(token, secretKey);

    // console.log(infoObj);
    // infoObj gives this after being verified: { _id: '677e55cc658b836c2426d9d8', iat: 1736332748, exp: 1736419148 }

    let userId = infoObj._id;

    let result = await WebUser.findByIdAndUpdate(userId, {
      isVerifiedEmail: true,
    });

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

// read all web user
export const readALlWebUser = async (req, res, next) => {
  try {
    let result = await WebUser.find({});
    res.status(200).json({
      success: true,
      message: "All users read successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: ("cant retrieve all webusers", error.message),
    });
  }
};

// read specific user
export const readSpecificWebUser = async (req, res, next) => {
  try {
    let result = await WebUser.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Specific User read successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: ("cant retrieve specific webusers", error.message),
    });
  }
};

// update webuser
export const updateWebUser = async (req, res, next) => {
  try {
    let result = await WebUser.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: " WebUser updated successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: ("Cant update webusers", error.message),
    });
  }
};

// delete user
export const deleteWebUser = async (req, res, next) => {
  try {
    let result = await WebUser.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: " WebUser deleted successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: ("Cant delete webusers", error.message),
      result: result,
    });
  }
};

// login
export const login = async (req, res, next) => {
  try {
    let email = req.body.email;
    let password = req.body.password;

    let user = await WebUser.findOne({ email });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    if (!user.isVerifiedEmail) {
      throw new Error("Email nor verified");
    }

    let isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error("Invalid Credentials");
    }

    let infoObj = {
      _id: user.id,
    };

    let expiryInfo = {
      expiresIn: "365d",
    };

    let token = await jwt.sign(infoObj, process.env.SECRET_KEY, expiryInfo);

    res.status(200).json({
      success: true,
      message: "WebUser Logged in Successfully",
      result: user,
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: ("failed to login", error.message),
    });
  }
};

// view the profile
export const myProfile = async (req, res, next) => {
  try {
    let _id = req._id;
    let result = await WebUser.findById(_id);
    res.status(200).json({
      success: true,
      message: "Profile read successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// update the profile
export const updateProfile = async (req, res, next) => {
  try {
    let _id = req._id;
    let data = req.body;
    delete data.email;
    delete data.password;

    let result = await WebUser.findByIdAndUpdate(_id, data, { new: true });

    res.status(200).json({
      success: true,
      message: "WebUser updated successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: ("failed to update webuser", error.message),
    });
  }
};

// update password
export const updatePassword = async (req, res, next) => {
  try {
    let _id = req._id;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;

    let data = await WebUser.findById(_id);
    let isValidPassword = bcrypt.compare(oldPassword, data.password);

    if (isValidPassword) {
      let hashedPassword = await bcrypt.hash(newPassword, 10);

      let result = await WebUser.findByIdAndUpdate(
        _id,
        { password: hashedPassword },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "Webuser password updated successfully",
        result: result,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: ("failed to update password", error),
    });
  }
};

// forgot password
export const forgotPassword = async (req, res, next) => {
  try {
    let email = req.body.email;
    let result = await WebUser.findOne({ email });

    if (result) {
      let infoObj = {
        _id: result._id,
      };

      let expiryInfo = {
        expiresIn: "1d",
      };

      let token = await jwt.sign(infoObj, process.env.SECRET_KEY, expiryInfo);

      await sendEmail({
        to: result.email,
        subject: "Reset Password",
        html: `Please click this link to reset your password
        <a href="http://localhost:3000/reset-password?token=token">http://localhost:3000/reset-password?token=${token}</a>
        `,
      });

      res.status(200).json({
        success: true,
        message: "Password Reset Link has been sent to your email",
        result: result,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// reset password
export const resetPassword = async (req, res, next) => {
  try {
    let password = req.body.password;
    let hashedPassword = await bcrypt.hash(password, 10);

    let result = await WebUser.findByIdAndUpdate(
      req._id,
      { password: hashedPassword },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "password reset successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: true,
      message: error.message,
    });
  }
};
