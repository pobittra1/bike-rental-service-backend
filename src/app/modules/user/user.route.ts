import express from "express";

import { authController } from "../auth/auth.contrtoller";
import { authValidations } from "../auth/auth.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

//destructuring controllers
const { userRegister, userLogin } = authController;
const { registerUserValidationSchema, loginUserValidationSchema } =
  authValidations;

//routes here
router.get("/me", validateRequest(registerUserValidationSchema), userRegister);

export const userRoutes = router;
