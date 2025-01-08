import express from "express";
import connectDb from "./src/connectDB/connectDB.js";
import userRouter from "./src/Routes/userRouter.js";
import teacherRouter from "./src/Routes/teacherRouter.js";
import companyRouter from "./src/Routes/companyRouter.js";
import bookRouter from "./src/Routes/bookRouter.js";
import { config, configDotenv } from "dotenv";
import webUserRouter from "./src/Routes/webUserRouter.js";
config();
const app = express();
const port = 3000;

connectDb();

app.use(express.json()); //json file read garna lai

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use("/user", userRouter);
app.use("/teacher", teacherRouter);
app.use("/company", companyRouter);
app.use("/book", bookRouter);

app.use("/webuser", webUserRouter);
// export const secretKey = process.env.SECRET_KEY;
