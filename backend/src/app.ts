import express, { Application } from "express";
import { getUserById, registerUser, signInUser } from "./controllers";
import { sendApplicationError } from "./errors";
import cors from "cors";

export const app: Application = express();

app.use(cors());

app.use(express.json());

app.post("/user/register", registerUser);

app.post("/user/login", signInUser);

app.get("/user/:user_id", getUserById);

app.use(sendApplicationError);
