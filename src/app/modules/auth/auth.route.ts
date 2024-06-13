import express from "express";
import { authController } from "./auth.contrtoller";
import validateRequest from "../../middlewares/validateRequest";
import { authValidations } from "./auth.validation";
const router = express.Router();

//destructuring controllers
const { userRegister, userLogin } = authController;
const { registerUserValidationSchema, loginUserValidationSchema } =
  authValidations;

//routes here
router.post(
  "/signup",
  validateRequest(registerUserValidationSchema),
  userRegister
);
router.post("/login", validateRequest(loginUserValidationSchema), userLogin);

export const authRoutes = router;
