import { ErrorRequestHandler } from "express";
import { JsonWebTokenError } from "jsonwebtoken";

export const sendCustomError: ErrorRequestHandler = (err, req, res, next) => {
  if (err.status && err.message) {
    res.status(err.status).send({ message: err.message });
  }

  next(err);
};

export const sendJWTError: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof JsonWebTokenError) {
    res.status(403).send({ message: "Unauthorised" });
  }

  next(err);
};

export const sendServerError: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);

  res.status(500).send({ message: "Internal Server Error" });
};
