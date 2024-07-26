import { db } from "../db/connection";

export const createUser = (
  username: string,
  email: string,
  password: string
) => {
  const formattedUser = [username, email, password];

  //! Below is redundant? The following check should fire the error when checking the type of a missing field
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
    VALUES ($1, $2, $3) RETURNING user_id`,
      formattedUser
    )
    .then(({ rows: userId }) => {
      return userId[0];
    });
};

export const logInUser = (email: string, password: string) => {
  //! Below is redundant? The following check should fire the error when checking the type of a missing field
  if (!email || !password) {
    return Promise.reject({ status: 400, message: "Bad request." });
  }

  if (typeof email !== "string" || typeof password !== "string") {
    return Promise.reject({ status: 400, message: "Bad request." });
  }

  return db
    .query(`SELECT user_id FROM users WHERE email = $1`, [email])
    .then(({ rows: userId }) => {
      if (userId.length === 0) {
        return Promise.reject({ status: 404, message: "Not found." });
      }

      return db
        .query(`SELECT password FROM users WHERE email = $1`, [email])
        .then(({ rows: passwordObject }) => {
          const givenPassword: string = passwordObject[0].password;
          return givenPassword === password
            ? userId[0]
            : Promise.reject({ status: 400, message: "Bad request." });
        });
    });
};

export const fetchUser = (user_id: string) => {
  return db
    .query(`SELECT username, email FROM users WHERE user_id = $1`, [user_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, message: "Not found." });
      }
      return rows[0];
    });
};
