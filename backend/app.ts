import express, { Application } from "express";
import { postUser } from "./controllers/user.controllers";
import {
  sendCustomError,
  sendPsqlError,
} from "./error_handlers/error_handlers";

export const app: Application = express();

app.use(express.json());

app.post("/user/register", postUser);

app.use(sendCustomError);

app.use(sendPsqlError);
