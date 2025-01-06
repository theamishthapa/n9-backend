import { Router } from "express";
import {
  createBookController,
  deleteBookController,
  getAllBookController,
  getSpecificBookController,
  updateBookController,
} from "../Controller/bookController.js";

let bookRouter = Router();

bookRouter.route("/").post(createBookController).get(getAllBookController);

//dynamic

bookRouter
  .route("/:id")
  .get(getSpecificBookController)
  .patch(updateBookController)
  .delete(deleteBookController);

export default bookRouter;
