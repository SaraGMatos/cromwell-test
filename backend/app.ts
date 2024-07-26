import express, { Application } from "express";
import { postUser } from "./controllers/user.controllers";

export const app: Application = express();

app.use(express.json());

app.post("/user/register", postUser);
