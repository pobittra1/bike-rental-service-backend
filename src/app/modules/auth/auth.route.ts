import express from "express";
import { authController } from "./auth.contrtoller";
import validateRequest from "../../middlewares/validateRequest";
import { authValidations } from "./auth.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./auth.constant";
const authRouter = express.Router();
const userRouter = express.Router();

//destructuring controllers
const { userRegister, userLogin, getProfile, updateProfile } = authController;
//destructuring auths
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
userRouter.get("/me", auth(USER_ROLE.admin, USER_ROLE.user), getProfile);
userRouter.put("/me", auth(USER_ROLE.admin, USER_ROLE.user), updateProfile);

export const Routes = {
  authRouter,
  userRouter,
};
