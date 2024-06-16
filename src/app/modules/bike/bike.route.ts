import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { bikeValidation } from "./bike.validation";
import { bikeController } from "./bike.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../auth/auth.constant";
const bikeRouter = express.Router();

//destructure validations
const { createBikeValidationSchema } = bikeValidation;
//destructuring controllers
const { createBike, getAllBikes } = bikeController;

//routes here
bikeRouter.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(createBikeValidationSchema),
  createBike
);
bikeRouter.get(
  "/",
  //auth(USER_ROLE.admin), anyone can access
  getAllBikes
);

export default bikeRouter;
