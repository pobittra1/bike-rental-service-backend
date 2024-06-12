import express from "express";
import { authController } from "./auth.contrtoller";
import validateRequest from "../../middlewares/validateRequest";
import { authValidations } from "./auth.validation";
const router = express.Router();

//destructuring controllers
const { userRegister } = authController;
const { registerUserValidationSchema } = authValidations;

//routes here
router.post(
  "/signup",
  validateRequest(registerUserValidationSchema),
  userRegister
);

export const authRoutes = router;
