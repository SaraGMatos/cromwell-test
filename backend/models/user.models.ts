import { db } from "../db/connection";

export const createUser = (
  username: string,
  email: string,
  password: string
) => {
  const formattedUser = [username, email, password];

  if (!username || !email || !password) {
    return Promise.reject({ status: 400, message: "Bad request." });
  }

  if (
    typeof username !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return Promise.reject({ status: 400, message: "Bad request." });
  }

  return db
    .query(
      `INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3) RETURNING *`,
      formattedUser
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
