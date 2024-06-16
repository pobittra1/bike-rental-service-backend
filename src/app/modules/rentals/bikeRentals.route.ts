import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../auth/auth.constant";
import { bikeRentalsValidation } from "./bikeRentals.validation";
import { bikeRentalsController } from "./bikeRentals.controller";
import auth from "../../middlewares/auth";
const bikeRentalsRouter = express.Router();

//destructure validations
const { createBikeRentalsValidationSchema } = bikeRentalsValidation;
//destructuring controllers
const { createBikeRentals } = bikeRentalsController;

//routes here
bikeRentalsRouter.post(
  "/",
  auth(USER_ROLE.user),
  validateRequest(createBikeRentalsValidationSchema),
  createBikeRentals
);

export default bikeRentalsRouter;
