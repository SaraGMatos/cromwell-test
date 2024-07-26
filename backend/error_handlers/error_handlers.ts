import { ErrorRequestHandler } from "express";

export const sendCustomError: ErrorRequestHandler = (err, req, res, next) => {
  if (err.status && err.message) {
    res.status(err.status).send({ message: err.message });
  }

  next(JSON.stringify(err));
};

export const sendServerError: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);

  res.status(500).send({ message: "Internal Server Error" });
};
