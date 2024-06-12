import express from "express";
import { authController } from "./auth.contrtoller";
const router = express.Router();

//destructuring controllers
const { userRegister } = authController;

//routes here
router.post("/signup", userRegister);

export const authRoutes = router;
