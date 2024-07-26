import { Response, Request, NextFunction } from "express";
import { createUser, fetchUser, logInUser } from "../models/user.models";

export const registerUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    username,
    email,
    password,
  }: { username: string; email: string; password: string } = req.body;

  createUser(username, email, password)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((error) => {
      next(error);
    });
};

export const signInUser = (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: { email: string; password: string } = req.body;

  logInUser(email, password)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((error) => {
      next(error);
    });
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.params;

  fetchUser(user_id)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((error) => {
      next(error);
    });
};
