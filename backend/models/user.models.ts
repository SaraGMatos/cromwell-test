import { db } from "../db/connection";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface User {
  user_id: number;
  username: string;
  email: string;
  password: string;
}

const fetchUserByEmail = async (email: string): Promise<User | null> => {
  const { rows } = await db.query(
    `SELECT user_id, email, username, password FROM users WHERE email = $1`,
    [email]
  );

  if (rows.length === 0) {
    return null;
  }

  const user = rows[0];

  return user;
};

const saveUser = async (
  username: string,
  email: string,
  hash: string
): Promise<number> => {
  const { rows } = await db.query(
    `INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3) RETURNING user_id`,
    [username, email, hash]
  );

  //TODO: Handle db failure [in the case where user_id is not returned]

  const { user_id } = rows[0];

  console.info(`Added user '${username}' in db`);

  return user_id as number;
};

export const createUser = async (
  username: string,
  email: string,
  password: string
): Promise<number> => {
  console.info(`Adding user '${username}' to db`);

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

  const user = await fetchUserByEmail(email);

  if (user) {
    return Promise.reject({ status: 409, message: "Already exists." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userId = await saveUser(username, email, hashedPassword);

  return userId;
};

export const logInUser = async (
  email: string,
  password: string
): Promise<string> => {
  if (!email || !password) {
    return Promise.reject({ status: 400, message: "Bad request." });
  }

  if (typeof email !== "string" || typeof password !== "string") {
    return Promise.reject({ status: 400, message: "Bad request." });
  }

  const user = await fetchUserByEmail(email);

  if (!user) {
    return Promise.reject({ status: 404, message: "Not found." });
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) {
    return Promise.reject({ status: 400, message: "Bad request." });
  }

  const secret = process.env.JWT_SIGNING_KEY;

  if (!secret) {
    return Promise.reject({ status: 500, message: "Server error." });
  }

  const token = jwt.sign({ user_id: user.user_id }, secret, {
    expiresIn: "1h",
  });

  return token;
};

export const fetchUserById = async (user_id: number): Promise<User> => {
  console.info(`Fetching user '${user_id}' from db`);

  const { rows } = await db.query<User>(
    `SELECT username, email FROM users WHERE user_id = $1`,
    [user_id]
  );

  if (rows.length === 0) {
    console.error(`Could not find user '${user_id}' in db`);

    return Promise.reject({ status: 404, message: "Not found." });
  }

  const user = rows[0];

  console.info(`Found user '${user_id}' in db`);

  return user;
};
