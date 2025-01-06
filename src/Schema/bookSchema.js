import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

export default bookSchema;

export const Book = mongoose.model("Book", bookSchema);
