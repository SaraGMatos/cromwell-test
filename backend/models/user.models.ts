import { db } from "../db/connection";

export const createUser = (
  username: string,
  email: string,
  password: string
): Promise<number> => {
  const formattedUser = [username, email, password];
  console.info(`Adding user '${username}' to db`);
  //! Below is redundant? The following check should fire the error when checking the type of a missing field
  if (!username || !email || !password) {
    console.error(`Could not add user '${username}' to db`);
    return Promise.reject({ status: 400, message: "Bad request." });
  }

  if (
    typeof username !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return Promise.reject({ status: 400, message: "Bad request." });
  }

  return fetchUserByEmail(email)
    .then((user) => {
      if (user) {
        return Promise.reject({ status: 409, message: "Already exists." });
      }
    })
    .then(() => {
      return db
        .query(
          `INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3) RETURNING user_id`,
          formattedUser
        )
        .then(({ rows }) => {
          console.log(rows[0].user_id);
          const { user_id } = rows[0];

          console.info(`Added user '${username}' in db`);
          return user_id as number;
        });
    });
};

const fetchUserByEmail = (email: string): Promise<User | null> => {
  return db
    .query(
      `SELECT user_id, email, username, password FROM users WHERE email = $1`,
      [email]
    )
    .then(({ rows }) => {
      const user = rows[0];

      if (rows.length === 0) {
        return null;
      }

      return user;
    });
};

export const logInUser = (email: string, password: string): Promise<number> => {
  //! Below is redundant? The following check should fire the error when checking the type of a missing field
  if (!email || !password) {
    return Promise.reject({ status: 400, message: "Bad request." });
  }

  if (typeof email !== "string" || typeof password !== "string") {
    return Promise.reject({ status: 400, message: "Bad request." });
  }

  return fetchUserByEmail(email).then((user) => {
    if (!user) {
      return Promise.reject({ status: 404, message: "Not found." });
    }

    return password === user.password
      ? user.user_id
      : Promise.reject({ status: 400, message: "Bad request." });
  });
};

interface User {
  user_id: number;
  username: string;
  email: string;
  password: string;
}

export const fetchUserById = (user_id: number): Promise<User> => {
  console.info(`Fetching user '${user_id}' from db`);
  return db
    .query<User>(`SELECT username, email FROM users WHERE user_id = $1`, [
      user_id,
    ])
    .then(({ rows }) => {
      const userObject = rows[0];

      if (rows.length === 0) {
        console.error(`Could not find user '${user_id}' in db`);

        return Promise.reject({ status: 404, message: "Not found." });
      }

      console.info(`Found user '${user_id}' in db`);
      return userObject;
    });
};
