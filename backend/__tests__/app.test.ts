import { app } from "../app";
import request from "supertest";
import { describe, test, expect } from "@jest/globals";
import { db } from "../db/connection";
import { seed } from "../db/seed";

afterAll(() => {
  db.end();
});

beforeEach(() => {
  return seed();
});

describe("API", () => {
  describe("/user/register", () => {
    test("POST 200: Responds with the posted user object and its required keys", () => {
      return request(app)
        .post("/user/register")
        .send({
          username: "Sara",
          email: "test@gmail.com",
          password: "Test1",
        })
        .expect(200)
        .then(({ body }) => {
          const { user } = body;

          expect(user).toMatchObject({
            username: "Sara",
            email: "test@gmail.com",
            password: "Test1",
          });
        });
    });

    test("POST 400: Responds with an adequate status and error message when provided with malformed body", () => {
      return request(app)
        .post("/user/register")
        .send({ username: "Sara", email: "test@gmail.com" })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Bad request.");
        });
    });

    test("POST 400: Responds with an adequate status and error message when the data type of the body's property values are not correct", () => {
      return request(app)
        .post("/user/register")
        .send({
          username: 77,
          email: 77,
          password: 3,
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Bad request.");
        });
    });

    test("POST 403: Responds with an adequate status and error message when the user already exists", () => {
      db.query(
        `INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3) RETURNING *`,
        ["Sara", "test@gmail.com", "test1"]
      ).then(({ rows }) => {
        console.log(rows);
      });

      return request(app)
        .post("/user/register")
        .send({
          username: "Sara",
          email: "test@gmail.com",
          password: "Test",
        })
        .expect(403)
        .then(({ body }) => {
          expect(body.message).toBe("Already exists.");
        });
    });
  });
});
