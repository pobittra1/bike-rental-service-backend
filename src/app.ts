import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import notFoundRoute from "./app/middlewares/notFoundRoute";
const app: Application = express();

//middlewares
app.use(express.json());
app.use(cors());

//main application route
app.use("/api", router);

//not found route
app.use(notFoundRoute);
export default app;
