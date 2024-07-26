import express, { Application } from "express";
import { getUserById, registerUser, signInUser } from "./controllers";
import { sendCustomError, sendServerError } from "./error_handlers";

export const app: Application = express();

app.use(express.json());

app.post("/user/register", registerUser);

app.post("/user/login", signInUser);

app.get("/user/:user_id", getUserById);

app.use(sendCustomError);

app.use(sendServerError);
