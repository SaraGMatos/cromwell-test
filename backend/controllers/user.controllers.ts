import { Response, Request, NextFunction } from "express";
import { createUser } from "../models/user.models";

export const postUser = (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;
  const user = createUser(username, email, password);

  res.status(200).send({ user });
};
