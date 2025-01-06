import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getAllUserController,
  getSpecificUserController,
  updateUserController,
} from "../Controller/userController.js";

let userRouter = Router();

//simple route
userRouter.route("/").post(createUserController).get(getAllUserController);
// userRouter.route("/").get(getAllUserController);

// dynamic route
userRouter
  .route("/:id")
  .get(getSpecificUserController)
  .patch(updateUserController)
  .delete(deleteUserController);

export default userRouter;
