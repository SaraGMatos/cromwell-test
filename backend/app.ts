import express, { Application } from "express";
import {
  getUser,
  registerUser,
  signInUser,
} from "./controllers/user.controllers";
import {
  sendCustomError,
  sendPsqlError,
} from "./error_handlers/error_handlers";

export const app: Application = express();

app.use(express.json());

app.post("/user/register", registerUser);

app.post("/user/login", signInUser);

app.get("/user/:user_id", getUser);

app.use(sendCustomError);

app.use(sendPsqlError);
