import express, { Application, Request, Response } from "express";
import cors from "cors";
const app: Application = express();

//middlewares
app.use(express.json());
app.use(cors());

export default app;
