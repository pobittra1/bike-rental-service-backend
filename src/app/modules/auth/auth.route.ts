import express from "express";
import { authController } from "./auth.contrtoller";
import validateRequest from "../../middlewares/validateRequest";
import { authValidations } from "./auth.validation";
import auth from "../../middlewares/auth";
const authRouter = express.Router();
const userRouter = express.Router();

//destructuring controllers
const { userRegister, userLogin, getProfile, updateProfile } = authController;
const { registerUserValidationSchema, loginUserValidationSchema } =
  authValidations;

//routes here
authRouter.post(
  "/signup",
  validateRequest(registerUserValidationSchema),
  userRegister
);

authRouter.post(
  "/login",
  validateRequest(loginUserValidationSchema),
  userLogin
);
userRouter.get("/me", auth(), getProfile);
userRouter.put("/me", auth(), updateProfile);

export const Routes = {
  authRouter,
  userRouter,
};
