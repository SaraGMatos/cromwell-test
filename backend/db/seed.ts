import { db } from "./connection";

export const seed = () => {
  return db.query(`DROP TABLE IF EXISTS users;`).then(() => {
    return db.query(
      `CREATE TABLE users (
      user_id SERIAL PRIMARY KEY, 
      username VARCHAR NOT NULL, 
      email VARCHAR NOT NULL, 
      password VARCHAR NOT NULL,
      UNIQUE (username, email));`
    );
  });
};
