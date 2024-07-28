import { ErrorRequestHandler } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { ApiError } from ".";

export const sendApplicationError: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).send({ message: err.message });
  }

  if (err instanceof JsonWebTokenError) {
    res.status(403).send({ message: "Unauthorised" });
  }

  next(err);
};
