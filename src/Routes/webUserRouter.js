import { Router } from "express";
import {
  createWebUserController,
  deleteWebUser,
  forgotPassword,
  login,
  myProfile,
  readALlWebUser,
  readSpecificWebUser,
  resetPassword,
  updatePassword,
  updateProfile,
  updateWebUser,
  verifyEmail,
} from "../Controller/webUserController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { isAuthorized } from "../middleware/isAuthorization.js";

let webUserRouter = Router();

webUserRouter.route("/").post(createWebUserController);

// only authorized user can read all
webUserRouter
  .route("/")
  .get(isAuthenticated, isAuthorized(["admin", "superAdmin"]), readALlWebUser);

webUserRouter.route("/verify-email").patch(verifyEmail);

// login route
webUserRouter.route("/login").post(login);
// view the profile route
webUserRouter.route("/my-profile").get(isAuthenticated, myProfile);
webUserRouter.route("/update-profile").patch(isAuthenticated, updateProfile);
webUserRouter.route("/update-password").patch(isAuthenticated, updatePassword);
webUserRouter.route("/forgot-password").post(forgotPassword);
webUserRouter.route("/reset-password").patch(isAuthenticated, resetPassword);

// dynamic routes always at the last
webUserRouter
  .route("/:id")
  .get(readSpecificWebUser)
  .patch(updateWebUser)
  .delete(deleteWebUser);
export default webUserRouter;
