import { Response, Request, NextFunction } from "express";
import { createUser, fetchUserById, logInUser } from "../models";

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

  console.info(
    `Handling post method for registering user with email '${email}'`
  );

  createUser(username, email, password)
    .then((user_id) => {
      // Resource creation is typically 201 in REST
      console.info(`User with id '${user_id}' registered successfully`);

      res.status(200).location(`/user/${user_id}`).send({ user: { user_id } });
    })
    .catch((error) => {
      console.error(`Error occurred registering user with email '${email}'`);

      next(error);
    });
};

export const signInUser = (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: { email: string; password: string } = req.body;

  console.info(`Handling post method for login user with email '${email}'`);

  logInUser(email, password)
    .then((user_id) => {
      console.info(`User with email '${email}' logged in successfully`);

      res.status(200).send({ user: { user_id } });
    })
    .catch((error) => {
      console.error(`Error occurred logging user with email '${email}' in`);

      next(error);
    });
};

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.params;

  console.info(`Handling get request for user with id '${user_id}'`);

  const formattedId = Number(user_id);

  if (!formattedId) {
    return next({ status: 400, message: "Bad request." });
  }

  fetchUserById(formattedId)
    .then((user) => {
      console.info(`User with id '${user_id}' fetched successfully`);

      res.status(200).send({ user });
    })
    .catch((error) => {
      console.error(`Error occurred fetching user with id '${user_id}'`);

      next(error);
    });
};
