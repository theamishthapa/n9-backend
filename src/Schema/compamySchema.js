import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  employeeNumber: {
    type: Number,
    required: true,
  },
});

export default companySchema;

export const Company = mongoose.model("Company", companySchema);
