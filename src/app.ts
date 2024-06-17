import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import notFoundRoute from "./app/middlewares/notFoundRoute";
import globalErrorHandler from "./app/middlewares/globalErrorHandler/globalErrorHandler";
const app: Application = express();

//middlewares
app.use(express.json());
app.use(cors());

//main application route
app.use("/api", router);
//global error handler
app.use(globalErrorHandler);
//not found route
app.use(notFoundRoute);
export default app;
