import { User } from "../Schema/userSchema.js";
import { sendEmail } from "../utils/sendMail.js";

export const createUserController = async (req, res, next) => {
  try {
    let result = await User.create(req.body);
    // SEND EMAIL

    await sendEmail({
      to: result.email,
      subject: "Account Registered Successfully",
      html: `Account registered on ${result.email}
      Now you can login`,
    });

    res.json({
      success: true,
      message: "User created successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllUserController = async (req, res, next) => {
  try {
    let result = await User.find({});
    res.json({
      success: true,
      message: "retrieved all users",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getSpecificUserController = async (req, res, next) => {
  try {
    let result = await User.findById(req.params.id);
    res.json({
      success: true,
      message: "read specific user",
      result: result,
    });
  } catch (error) {
    res.json({
      success: true,
      message: "read specific user",
      result: result,
    });
  }
};

export const updateUserController = async (req, res, next) => {
  try {
    let result = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({
      success: true,
      message: "user updated succesfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUserController = async (req, res, next) => {
  try {
    let result = await User.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "user updated succesfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
