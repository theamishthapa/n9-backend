import { Teacher } from "../Schema/teacherSchema.js";

export const createTeacherController = async (req, res, next) => {
  try {
    let result = await Teacher.create(req.body);
    res.json({
      success: true,
      message: "teacher created successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllTeacherController = async (req, res, next) => {
  try {
    let result = await Teacher.find({});
    res.json({
      success: true,
      message: "retrieved all teacher info",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getSpecificTeacherController = async (req, res, next) => {
  try {
    let result = await Teacher.findById(req.params.id);
    res.json({
      success: true,
      message: "Read specific Teacher",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTeacherController = async (req, res, next) => {
  try {
    let result = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({
      success: true,
      message: "Updated Teachers successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTeacherController = async (req, res, next) => {
  try {
    let result = await Teacher.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "teacher deleted successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      result: result,
    });
  }
};
