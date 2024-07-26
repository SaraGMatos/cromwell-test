import { db } from "../db/connection";

export const createUser = (
  username: string,
  email: string,
  password: string
) => {
  const formattedUser = [username, email, password];

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
