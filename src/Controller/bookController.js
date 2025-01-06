import { Book } from "../Schema/bookSchema.js";

export const createBookController = async (req, res, next) => {
  try {
    let result = await Book.create(req.body);
    res.json({
      success: true,
      message: "Book created successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBookController = async (req, res, next) => {
  try {
    let result = await Book.find({});
    res.json({
      success: true,
      message: "all books fetched successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getSpecificBookController = async (req, res, next) => {
  try {
    let result = await Book.findById(req.params.id);
    res.json({
      success: true,
      message: "specific books fetched successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBookController = async (req, res, next) => {
  try {
    let result = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({
      success: true,
      message: "book updated successfully",
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

export const deleteBookController = async (req, res, next) => {
  try {
    let result = await Book.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "book deleted successfully",
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
