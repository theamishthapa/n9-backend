import { Router } from "express";
import {
  createWebUserController,
  verifyEmail,
} from "../Controller/webUserController.js";

let webUserRouter = Router();

webUserRouter.route("/").post(createWebUserController);

webUserRouter.route("/verify-email").patch(verifyEmail);

export default webUserRouter;
