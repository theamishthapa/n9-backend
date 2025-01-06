import { Router } from "express";
import {
  createTeacherController,
  deleteTeacherController,
  getAllTeacherController,
  getSpecificTeacherController,
  updateTeacherController,
} from "../Controller/teacherController.js";

let teacherRouter = Router();

teacherRouter
  .route("/")
  .post(createTeacherController)
  .get(getAllTeacherController);

//dynamic route
teacherRouter
  .route("/:id")
  .get(getSpecificTeacherController)
  .patch(updateTeacherController)
  .delete(deleteTeacherController);

export default teacherRouter;
