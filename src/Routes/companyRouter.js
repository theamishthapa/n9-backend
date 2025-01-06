import { Router } from "express";
import {
  createCompanyController,
  deleteCompanyController,
  getAllCompanyController,
  getSpecificCompanyController,
  updateCompanyController,
} from "../Controller/companyController.js";

let companyRouter = Router();

companyRouter
  .route("/")
  .post(createCompanyController)
  .get(getAllCompanyController);

//dynamic routing
companyRouter
  .route("/:id")
  .get(getSpecificCompanyController)
  .patch(updateCompanyController)
  .delete(deleteCompanyController);

export default companyRouter;
