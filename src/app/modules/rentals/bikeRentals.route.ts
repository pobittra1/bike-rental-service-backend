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
const { createBikeRentals, returnBikeToOwner, getAllRentals } =
  bikeRentalsController;

//routes here
bikeRentalsRouter.post(
  "/",
  auth(USER_ROLE.user),
  validateRequest(createBikeRentalsValidationSchema),
  createBikeRentals
);
bikeRentalsRouter.put("/:id/return", auth(USER_ROLE.admin), returnBikeToOwner);
bikeRentalsRouter.get("/", auth(USER_ROLE.user), getAllRentals);

export default bikeRentalsRouter;
