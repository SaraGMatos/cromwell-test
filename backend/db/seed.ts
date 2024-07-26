import { db } from "./connection";
import format from "pg-format";
import { userData } from "../db/data";

export const seed = () => {
  return db
    .query(`DROP TABLE IF EXISTS users;`)
    .then(() => {
      return db.query(
        `CREATE TABLE users (
      user_id SERIAL PRIMARY KEY, 
      username VARCHAR NOT NULL, 
      email VARCHAR NOT NULL, 
      password VARCHAR NOT NULL,
      UNIQUE (username, email));`
      );
    })
    .then(() => {
      const insertUsersQueryStr = format(
        "INSERT INTO users (username, email, password) VALUES %L;",
        userData.map(({ username, email, password }) => [
          username,
          email,
          password,
        ])
      );

      return db.query(insertUsersQueryStr);
    });
};
