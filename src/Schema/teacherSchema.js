import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
});

export default teacherSchema;

export const Teacher = mongoose.model("Teacher", teacherSchema);
