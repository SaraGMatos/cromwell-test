import { Response, Request, NextFunction } from "express";
import { createUser, fetchUserById, logInUser } from "../models";
import jwt, { JwtPayload } from "jsonwebtoken";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    username,
    email,
    password,
  }: { username: string; email: string; password: string } = req.body;

  console.info(
    `Handling post method for registering user with email '${email}'`
  );

  try {
    const user_id = await createUser(username, email, password);

    console.info(`User with id '${user_id}' registered successfully`);

    // Resource creation is typically 201 in REST
    res.status(200).location(`/user/${user_id}`).send({ user: { user_id } });
  } catch (error: unknown) {
    console.error(`Error occurred registering user with email '${email}'`);

    next(error);
  }
};

export const signInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password }: { email: string; password: string } = req.body;

  console.info(`Handling post method for login user with email '${email}'`);

  try {
    const token = await logInUser(email, password);

    console.info(`User with email '${email}' logged in successfully`);

    res.status(200).send({ token });
  } catch (error: unknown) {
    console.error(`Error occurred logging user with email '${email}' in`);

    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { user_id } = req.params;
  console.info(`Handling get request for user with id '${user_id}'`);

  try {
    if (!req.headers.authorization) {
      return next({ status: 401, message: "Unauthenticated request." });
    }

    const token = req.headers.authorization;
    const secret = process.env.JWT_SIGNING_KEY!;
    const payload = jwt.verify(token, secret) as JwtPayload;

    const formattedId = Number(user_id);

    if (!formattedId) {
      return next({ status: 400, message: "Bad request." });
    }

    if (payload["user_id"] !== formattedId) {
      return next({ status: 403, message: "Unauthorised." });
    }

    const user = await fetchUserById(formattedId);

    console.info(`User with id '${user_id}' fetched successfully`);

    res.status(200).send({ user });
  } catch (error: unknown) {
    console.error(`Error occurred fetching user with id '${user_id}'`);

    next(error);
  }
};
