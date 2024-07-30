import { db } from "./connection";
import format from "pg-format";
import { userData } from "../db/data";

export const createUserTable = async (): Promise<void> => {
  await db.query(`DROP TABLE IF EXISTS users;`);
  await db.query(
    `CREATE TABLE users (
      user_id SERIAL PRIMARY KEY, 
      username VARCHAR NOT NULL, 
      email VARCHAR NOT NULL, 
      password VARCHAR NOT NULL,
      UNIQUE (username, email));`
  );
};

export const seed = async (): Promise<void> => {
  await createUserTable();

  const insertUsersQueryStr = format(
    "INSERT INTO users (username, email, password) VALUES %L;",
    userData.map(({ username, email, password }) => [username, email, password])
  );

  await db.query(insertUsersQueryStr);
};
