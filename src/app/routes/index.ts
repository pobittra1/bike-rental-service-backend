import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route";
const router = Router();

//routes here for each module/path
const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
