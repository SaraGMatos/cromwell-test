import { ErrorRequestHandler } from "express";

export const sendCustomError: ErrorRequestHandler = (err, req, res, next) => {
  if (err.status && err.message) {
    res.status(err.status).send({ message: err.message });
  }
  next(err);
};

export const sendPsqlError: ErrorRequestHandler = (err, req, res, next) => {
  if (err.code === "23505") {
    res.status(403).send({ message: "Already exists." });
  }
  next(err);
};
