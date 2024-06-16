import { Router } from "express";
import { Routes } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/user/user.route";
import bikeRouter from "../modules/bike/bike.route";
const router = Router();

const { authRouter, userRouter } = Routes;

//routes here for each module/path
const moduleRoutes = [
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/bikes",
    route: bikeRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
