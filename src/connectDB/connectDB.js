import mongoose from "mongoose"; //new es6

const connectDb = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/n94"); //for importing shortcut ctrl + esc
  console.log("databse connected successfully");
};

export default connectDb;
