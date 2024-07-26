import { ErrorRequestHandler } from "express";

export const sendCustomError: ErrorRequestHandler = (err, req, res, next) => {
  if (err.status && err.message) {
    res.status(err.status).send({ message: err.message });
  }
  next(err);
};

export const sendPsqlError: ErrorRequestHandler = (err, req, res, next) => {
  if (err.code === "23505") {
    res.status(409).send({ message: "Already exists." });
  }

  if (err.code === "22P02" || err.code === "23502") {
    res.status(400).send({ message: "Bad request." });
  }
  next(err);
};
