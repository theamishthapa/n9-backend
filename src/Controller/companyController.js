import { Company } from "../Schema/compamySchema.js";

export const createCompanyController = async (req, res, next) => {
  try {
    let result = await Company.create(req.body);
    res.json({
      success: true,
      message: "company created successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllCompanyController = async (req, res, next) => {
  try {
    let result = await Company.find({});
    res.json({
      success: true,
      message: "all companies retrieved successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getSpecificCompanyController = async (req, res, next) => {
  try {
    let result = await Company.findById(req.params.id);
    res.json({
      success: true,
      message: "company retrieved",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCompanyController = async (req, res, next) => {
  try {
    let result = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({
      success: true,
      message: "company updated",
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

export const deleteCompanyController = async (req, res, next) => {
  try {
    let result = await Company.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "company created successfully",
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
